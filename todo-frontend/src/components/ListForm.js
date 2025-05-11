import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListService from '../services/ListService';

const ListForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    userId: 1 // Default userId - in a real app, this would come from authentication
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // If id exists, fetch list data for editing
    if (id) {
      setIsEdit(true);
      setLoading(true);
      ListService.getListById(id)
        .then(response => {
          const list = response.data;
          setFormValues({
            name: list.name,
            description: list.description || '',
            userId: list.userId
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching list:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const listData = {
      ...formValues
    };

    const saveList = isEdit
      ? ListService.updateList(id, listData)
      : ListService.createList(listData);

    saveList
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        console.error('Error saving list:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit List' : 'Add New List'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
          {isEdit ? 'Update List' : 'Add List'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ListForm;