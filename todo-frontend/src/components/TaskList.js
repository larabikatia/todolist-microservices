import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../services/TaskService';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    TaskService.deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again later.');
      });
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">My Tasks</h2>
      <Link to="/tasks/add" className="btn btn-primary mb-3">Add New Task</Link>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks available. Create your first task!</div>
      ) : (
        <div className="list-group">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;