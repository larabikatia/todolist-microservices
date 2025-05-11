import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{task.title}</h5>
        <small>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</small>
      </div>
      <p className="mb-1">{task.description}</p>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <div>
          <Link to={`/tasks/edit/${task.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;