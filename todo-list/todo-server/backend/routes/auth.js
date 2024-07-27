// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../dbConfig');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [id] = await db('users').insert({ name, email, password: hashedPassword });
    const newUser = await db('users').where({ id }).first();
    res.status(201).json(newUser);
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



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
