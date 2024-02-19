// TaskInput.js
import React, { useState } from 'react';
import '../App.css';

const TaskInput = ({ onAdd }) => {
    const [task, setTask] = useState('');

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        onAdd(task);
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input type="text" value={task} onChange={handleChange} placeholder="Add a new task" />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskInput;
