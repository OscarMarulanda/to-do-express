const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Task title (required)
    description: { type: String },            // Task details (optional)
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },                  // Optional due date
    createdAt: { type: Date, default: Date.now }  // Auto-set creation date
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;