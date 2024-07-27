const express = require('express'); //a express import
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

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
            currentTodo.length === 0 ? res.status(404).json({message: 'Todo not found'}) : res.status(200).json(currentUser)
        
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
        res.status(201).json(newUser);
        } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
        }
    });


server.post('/login', async (req, res) => {
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



module.exports = server;



// server.get('/todos', async (req, res) => {
//     //Get all todos
//     try {
//         const todos = await db('todos');
//         res.json(todos)
//     } catch(err) {
//         console.log(err);
//     }
    
// });


// server.get('/todos/:id', async (req, res) => {
//     //Get all todos
//     const { id } = req.params
//     try {
//         const currentTodo = await db('todos').where({ id });
//         currentTodo.length === 0 ? res.status(404).json({message: 'Todo not found'}) : res.status(200).json(currentTodo)
//         // res.status(200).json(currentTodo)
//     } catch(err) {
//         console.log(err);
//     }
    
// });

// server.post('/todos', async (req, res) => {
//     //POST all todos
//     const {message} = req.body
//     console.log({message})
//     if (!message) {
//         return res.status(400).json({message: 'No todo message included.'})
//     }
//     try {
//         await db('todos').insert({message})
//         res.status(201).json({message: 'Todo successfully stored!' })
//     } catch(err) {
//         console.log(err)
//     }
// });


// server.put('/todos/:id', async (req, res) => {
//     //PUT all todos
//     const { id } = req.params
//     const { message } = req.body
//     if (!message) {
//         return res.status(400).json({message: 'No todo message included.'})
//     }
//     try {
//         await db('todos').where({ id }).update({ message })
//         res.status(200).json({message: 'Update Successfull!'})
        
//     } catch (err) {
//         console.log(err)
        
//     }
// });


// server.delete('/todos/:id', async (req, res) => {
//     //DELETE all todos
//     const { id } = req.params
//     // const { message } = req.body
    
//     try {
//         await db('todos').where({ id }).del()
//         res.status(200).json({message: 'Delete Successfull!'})
        
//     } catch (err) {
//         console.log(err)
        
//     }
// });




