const mongoose = require('mongoose');
const Task = require('./models/Task');  // Import Task model
const User = require('./models/User');


const uri = "mongodb+srv://odmarulandab:odmb7750@pizzeria.ybeag81.mongodb.net/to-do?retryWrites=true&w=majority&appName=pizzeria";

mongoose.connect(uri)
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch(err => console.error("Error connecting to MongoDB Atlas:", err));


// Create a new task
const newTask = new Task({
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
    email: "odmarulandab@unal.edu.co",
    passwordHash: "odmb7750", // Store hashed passwords
})

newUser.save()
    .then(()=>console.log("Usuario agregado"))
    .catch(err=>console.error("Error agregando usuario:", err))