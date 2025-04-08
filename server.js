require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');  // Import Task model
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const TodoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const Todo = mongoose.model('tasks', TodoSchema);

app.get('/tasks', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.delete('/tasks/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));

/* const newTask = new Task({
    title: "Finish MongoDB setup",
    description: "Connect MongoDB Atlas with Mongoose and test",
    status: "pending",
    dueDate: new Date("2025-04-10")
});

newTask.save()
    .then(() => console.log("Task added!"))
    .catch(err => console.error("Error adding task:", err));

const newUser = new User({
    name: "Oscar Marulanda",
    email: "odmarulandab@unal.edu.com",
    passwordHash: "odmb7750", // Store hashed passwords
})

newUser.save()
    .then(()=>console.log("Usuario agregado"))
    .catch(err=>console.error("Error agregando usuario:", err)) */