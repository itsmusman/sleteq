// TaskList.js
import React from 'react';
import '../App.css';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    return (
        <Droppable droppableId="tasks">
            {(provided) => (
                <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                        <Task
                            key={index}
                            index={index}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
};

export default TaskList;
