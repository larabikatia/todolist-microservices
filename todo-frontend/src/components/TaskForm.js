import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';
import ListService from '../services/ListService';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    completed: false,
    dueDate: '',
    userId: '1', // Default userId - in a real app, this would come from authentication
    listId: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Fetch available lists
    ListService.getListsByUser(1)
      .then(response => {
        setLists(response.data);
        if (response.data.length > 0) {
          setFormValues(prev => ({ ...prev, listId: response.data[0].id }));
        }
      })
      .catch(error => console.error('Error fetching lists:', error));

    // If id exists, fetch task data for editing
    if (id) {
      setIsEdit(true);
      setLoading(true);
      TaskService.getTaskById(id)
        .then(response => {
          const task = response.data;
          setFormValues({
            title: task.title,
            description: task.description || '',
            completed: task.completed || false,
            dueDate: task.dueDate ? task.dueDate.substring(0, 16) : '',
            userId: task.userId || '1',
            listId: task.listId || ''
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching task:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formValues.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const taskData = {
      ...formValues,
      userId: formValues.userId.toString()
    };

    const saveTask = isEdit
      ? TaskService.updateTask(id, taskData)
      : TaskService.createTask(taskData);

    saveTask
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        console.error('Error saving task:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formValues.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formValues.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="listId" className="form-label">List</label>
          <select
            className="form-control"
            id="listId"
            name="listId"
            value={formValues.listId}
            onChange={handleChange}
          >
            <option value="">Select a list</option>
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            name="completed"
            checked={formValues.completed}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="completed">Completed</label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
          {isEdit ? 'Update Task' : 'Add Task'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;