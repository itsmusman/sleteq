// Task.js
import React, { useState } from 'react';
import '../App.css';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleDelete = () => {
        onDelete(index);
    };

    const handleEdit = () => {
        onEdit(index, editedTask);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleChange = (e) => {
        setEditedTask(e.target.value);
    };

    return (
        <Draggable draggableId={index.toString()} index={index}>
            {(provided) => (
                <li
                    className="task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {editing ? (
                        <>
                            <input type="text" value={editedTask} onChange={handleChange} />
                            <div className="task-buttons">
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleEdit}>Save</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span>{task}</span>
                            <div className="task-buttons">
                                <button onClick={() => setEditing(true)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        </>
                    )}
                </li>
            )}
        </Draggable>
    );
};

export default Task;
