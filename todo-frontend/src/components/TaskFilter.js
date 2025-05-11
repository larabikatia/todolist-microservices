// src/components/TaskFilter.js
import React from 'react';

const TaskFilter = ({ onFilterChange, filters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange(name, type === 'checkbox' ? checked : value);
  };
  
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Filtres</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher par titre..."
              name="searchTerm"
              value={filters.searchTerm || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="col-md-3">
            <select 
              className="form-select" 
              name="status" 
              value={filters.status || 'all'} 
              onChange={handleChange}
            >
              <option value="all">Tout statut</option>
              <option value="completed">Terminées</option>
              <option value="active">En cours</option>
            </select>
          </div>
          
          <div className="col-md-3">
            <select 
              className="form-select" 
              name="sortBy" 
              value={filters.sortBy || 'createdAt'} 
              onChange={handleChange}
            >
              <option value="createdAt">Date de création</option>
              <option value="dueDate">Date d'échéance</option>
              <option value="title">Titre</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;