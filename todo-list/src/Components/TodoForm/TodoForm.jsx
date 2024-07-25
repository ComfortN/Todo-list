import './TodoForm.css'
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography, IconButton } from '@mui/material';
// import DatePicker from '@mui/lab/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, {useState} from 'react'
import { Edit, Delete } from '@mui/icons-material';

export default function TodoForm() {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [tasks, setTasks] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = { taskName, description, priority, dueDate };
        setTasks([...tasks, newTask]);
        // Reset form
        setTaskName('');
        setDescription('');
        setPriority('');
        setDueDate(null);
        console.log({taskName, description, priority, dueDate})
    };


    const getPriorityColor = (priority) => {
        if (priority === 'high') {
        return 'red';
    } else if (priority === 'medium') {
        return 'yellow';
    } else if (priority === 'low') {
        return 'green';
    } else {
        return '#592E83';
    }
    };


    const handleDelete = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };
    
    const handleEdit = (index) => {
        const taskToEdit = tasks[index];
        setTaskName(taskToEdit.taskName);
        setDescription(taskToEdit.description);
        setPriority(taskToEdit.priority);
        setDueDate(taskToEdit.dueDate);
        handleDelete(index);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle form submission logic here
    //     console.log({ taskName, description, priority, dueDate });
    // };


    


    return (
        
        <Box className="todoFormContainer">
        
            <Box className="todoForm">
            <Typography variant="h5" gutterBottom>Task Form</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Task Name"
                variant="outlined"
            
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <TextField
                label="Description"
                variant="outlined"
                
                
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
                variant="outlined"
                >
                <MenuItem value="high" style={{ backgroundColor: 'red', color: 'white' }}>High</MenuItem>
                <MenuItem value="medium" style={{ backgroundColor: 'yellow', color: 'black' }}>Medium</MenuItem>
                <MenuItem value="low" style={{ backgroundColor: 'green', color: 'white' }}>Low</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Due Date"
            value={dueDate}
            onChange={(newDate) => setDueDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
            </LocalizationProvider>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Task
            </Button>
            </form>
        </Box>
        <Box className="taskList">
        {tasks.map((task, index) => (
        <Box key={index} className="taskItem" style={{ backgroundColor: getPriorityColor(task.priority) }}>
        <Box className="taskDetails">
            <Typography variant="body1"><strong>Task Name:</strong> {task.taskName}</Typography>
            <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
            <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
            <Typography variant="body2"><strong>Due Date:</strong> {task.dueDate?.format('DD/MM/YYYY')}</Typography>
        </Box>
        <Box className="taskActions">
            <IconButton onClick={() => handleEdit(index)}>
            <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)}>
            <Delete />
            </IconButton>
        </Box>
        </Box>
    ))}
    </Box>
        </Box>
        
    )
}
