import './TodoForm.css';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useState, useEffect } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import { getDb } from '../../Database/Statements';

export default function TodoForm() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const db = getDb();
      const user = JSON.parse(localStorage.getItem('token'));
      if (user) {
        try {
          const stmt = db.prepare('SELECT * FROM tasks WHERE userId = ?');
          stmt.bind([user.id]);
          const taskList = [];
          while (stmt.step()) {
            taskList.push(stmt.getAsObject());
          }
          setTasks(taskList);
          stmt.free();
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchTasks();
  }, []);

  const validate = () => {
    let tempErrors = {};
    tempErrors.taskName = taskName ? "" : "Task name is required";
    tempErrors.description = description ? "" : "Description is required";
    tempErrors.priority = priority ? "" : "Priority is required";
    tempErrors.dueDate = dueDate ? "" : "Due date is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const db = getDb();
    const user = JSON.parse(localStorage.getItem('token'));
    if (!user) {
      console.error('No user found in localStorage');
      return;
    }

    const newTask = {
      taskName,
      description,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null,
      userId: user.id,
    };

    try {
      if (editingIndex !== null) {
        // Update task
        const taskId = tasks[editingIndex].id;
        db.run(
          `UPDATE tasks SET taskName = ?, description = ?, priority = ?, dueDate = ? WHERE id = ?`,
          [newTask.taskName, newTask.description, newTask.priority, newTask.dueDate, taskId]
        );
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? { ...task, ...newTask, id: taskId } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        // Create new task
        db.run(
          `INSERT INTO tasks (taskName, description, priority, dueDate, userId) VALUES (?, ?, ?, ?, ?)`,
          [newTask.taskName, newTask.description, newTask.priority, newTask.dueDate, newTask.userId]
        );
        const taskId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
        setTasks([...tasks, { ...newTask, id: taskId }]);
      }
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }

    setTaskName('');
    setDescription('');
    setPriority('');
    setDueDate(null);
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

  const handleDelete = async (index) => {
    const db = getDb();
    const taskToDelete = tasks[index];
    try {
      db.run(`DELETE FROM tasks WHERE id = ?`, [taskToDelete.id]);
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.taskName);
    setDescription(taskToEdit.description);
    setPriority(taskToEdit.priority);
    setDueDate(dayjs(taskToEdit.dueDate));
    setEditingIndex(index);
  };

  return (
    <Box className="todoFormContainer">
      <Box className="todoForm">
        <Typography variant="h5" gutterBottom>Task Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name" variant="outlined" value={taskName}
            onChange={(e) => setTaskName(e.target.value)} error={Boolean(errors.taskName)}
            helperText={errors.taskName} fullWidth margin="normal"
          />
          <TextField
            label="Description" variant="outlined" rows={4} value={description}
            onChange={(e) => setDescription(e.target.value)} error={Boolean(errors.taskName)}
            helperText={errors.taskName} fullWidth margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority} onChange={(e) => setPriority(e.target.value)}
              label="Priority" variant="outlined"
            >
              <MenuItem value="high" style={{ backgroundColor: 'red', color: 'white' }}>High</MenuItem>
              <MenuItem value="medium" style={{ backgroundColor: 'yellow', color: 'black' }}>Medium</MenuItem>
              <MenuItem value="low" style={{ backgroundColor: 'green', color: 'white' }}>Low</MenuItem>
            </Select>
            <Typography variant="body2" color="error">
              {errors.priority}
            </Typography>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newDate) => setDueDate(newDate)}
              slotProps={{
                textField: { fullWidth: true, margin: "normal" }
              }}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editingIndex !== null ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
      </Box>
      <Box className="taskList">
        <Typography variant="h5" gutterBottom className='tasks'>Todo Task</Typography>
        {tasks.map((task, index) => (
          <Box key={index} className="taskItem" style={{ backgroundColor: getPriorityColor(task.priority) }}>
            <Box className="taskDetails">
              <Typography variant="body1"><strong>Task Name:</strong> {task.taskName}</Typography>
              <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
              <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
              <Typography variant="body2"><strong>Due Date:</strong> {dayjs(task.dueDate).isValid() ?
                dayjs(task.dueDate).format('DD/MM/YYYY') : 'Invalid date'}</Typography>
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
  );
}
