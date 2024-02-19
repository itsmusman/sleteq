// Home.js
import React, { useEffect, useState } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Clock from '../components/Clock';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomColorBackGround = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random color
            const randomColorText = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random color
            setBackgroundColor(randomColorBackGround);
            setTextColor(randomColorText);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const addTask = (task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const editTask = (index, newTask) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = newTask;
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [removed] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, removed);

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div className="container" style={{ backgroundColor: backgroundColor, color: textColor }}>
            <h1 className="title">To-Do List</h1>
            <div className='clock-wrapper'>
                <Clock />
            </div>
            <TaskInput onAdd={addTask} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Home;
