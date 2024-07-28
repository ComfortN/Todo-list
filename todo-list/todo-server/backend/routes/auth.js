// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../dbConfig');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const secret = 'your_jwt_secret';

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [id] = await db('users').insert({ name, email, password: hashedPassword });
    const newUser = await db('users').where({ id }).first();
    const token = jwt.sign({id: newUser.id, email: newUser.email }, secret, { expiresIn: '1h'})
    res.status(201).json({token, user: newUser});
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('id', 'name', 'email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});


router.get('/user', verifyToken, async (req, res) => {
  try {
      const user = await db('users').where({ id: req.userId }).first();
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user data', error });
  }
});

router.put('/user', verifyToken, async (req, res) => {
  const { name, email } = req.body;
  try {
      await db('users').where({ id: req.userId }).update({ name, email });
      const updatedUser = await db('users').where({ id: req.userId }).first();
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: 'Error updating user data', error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({id: user.id, email: user.email}, secret, {expiresIn: '1h'});
      res.status(200).json({token, message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
