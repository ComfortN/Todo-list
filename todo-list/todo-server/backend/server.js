const express = require('express'); //a express import
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const verifyToken = require('./middleware/verifyToken');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const db = require('./dbConfig');
const authRoutes = require('./routes/auth')

const server = express();// declaire express server

server.use(cors());
server.use(helmet());
server.use(express.json()); //It passes request in json format
server.use('/auth', authRoutes);


//basic route declare
server.get('/', (req, res) => {
    res.send('Welcome to the Todo app server!!')
});




server.get('/users',  async (req, res) => {
    try {
        const users = await db('users').select('id', 'name', 'email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});


server.get('/users', verifyToken,  async (req, res) => {
    try {
        const users = await db('users').select('id', 'name', 'email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});


server.get('/todo', verifyToken, async (req, res) => {
    const userId = req.userId; // Extract user id from token
    try {
        const todos = await db('todos').where({ userId });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
    }
});


server.post('/todo', verifyToken, async (req, res) => {
    const { taskName, description, priority, dueDate } = req.body;
    const userId = req.userId;

    if (!taskName || !description || !priority || !dueDate) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const [id] = await db('todos').insert({ taskName, description, priority, dueDate, userId });
        const newTodo = await db('todos').where({ id }).first();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Error creating todo', error });
    }
});




server.get('/users', async (req, res) => {
    //Get all todos
    try {
        const users = await db('users').select('*');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});


server.get('/users/:id', async (req, res) => {
        //Get all todos
        const { id } = req.params
        try {
            const currentUser = await db('users').where({ id });
            currentUser.length === 0 ? res.status(404).json({message: 'User not found'}) : res.status(200).json(currentUser)
        
        } catch(err) {
            console.log({ message: "Error fetching users", err });
        }
        
    });


server.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
        }
    
        try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const [id] = await db('users').insert({ name, email, password: hashedPassword });
        const newUser = await db('users').where({ id }).first();
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser});
        } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
        }
    });


server.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db('users').where({ email }).first();
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({id: user.id, email: user.email}, secret, { expiresIn: '1h'} );
            res.status(200).json({ token, message: "Login successful" });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});


server.put('/todo/:id', verifyToken, async (req, res) => {
    const { taskName, description, priority, dueDate } = req.body;
    const { id } = req.params;
    const userId = req.userId;

    if (!taskName || !description || !priority || !dueDate) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const updatedTask = await db('todos')
            .where({ id, userId }) // Ensure the task belongs to the logged-in user
            .update({ taskName, description, priority, dueDate });

        if (updatedTask) {
            const newTask = await db('todos').where({ id }).first();
            res.status(200).json(newTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error });
    }
});


server.delete('/todo/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const deletedTask = await db('todos')
            .where({ id, userId }) // Ensure the task belongs to the logged-in user
            .del();

        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error });
    }
});


server.delete('/users/:id', async (req, res) => {
    //DELETE all todos
    const { id } = req.params
    
    
    try {
        await db('users').where({ id }).del()
        res.status(200).json({message: 'Delete Successfull!'})
        
    } catch (err) {
        console.log(err)
        
    }
});



server.get('/todo/search', verifyToken, async (req, res) => {
    const userId = req.userId;
    const { query } = req.query; // Get the search query from the request

    try {
        const todos = await db('todos')
            .where({ userId })
            .andWhere(function() {
                this.where('taskName', 'like', `%${query}%`)
                    .orWhere('description', 'like', `%${query}%`);
            });

        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
    }
});



module.exports = server;
