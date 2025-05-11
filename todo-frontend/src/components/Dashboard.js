// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';
import { getTasks } from '../utils/localStorageService';
import LoadingSpinner from './LoadingSpinner';
import { useNotification } from '../context/NotificationContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasks = await getTasks(TaskService);
      setTasks(tasks);
      
      // Calculate stats
      const now = new Date();
      const completed = tasks.filter(task => task.completed).length;
      const overdue = tasks.filter(task => 
        !task.completed && task.dueDate && new Date(task.dueDate) < now
      ).length;
      
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
        overdue
      });
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
      addNotification('Impossible de récupérer les tâches. Utilisation des données locales.', 'warning');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner text="Chargement du tableau de bord..." />;
  }
  
  return (
    <div className="dashboard">
      <h2 className="mb-4">Tableau de bord</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Total</h5>
              <p className="card-text display-4">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Terminées</h5>
              <p className="card-text display-4">{stats.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h5 className="card-title">En cours</h5>
              <p className="card-text display-4">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h5 className="card-title">En retard</h5>
              <p className="card-text display-4">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Tâches récentes</h5>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => navigate('/tasks/add')}
              >
                Ajouter
              </button>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <p className="text-muted">Aucune tâche disponible</p>
              ) : (
                <ul className="list-group">
                  {tasks.slice(0, 5).map(task => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                        {task.title}
                      </span>
                      <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                        {task.completed ? 'Terminée' : 'En cours'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Actions rapides</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" onClick={() => navigate('/tasks/add')}>
                  Nouvelle tâche
                </button>
                <button className="btn btn-outline-success" onClick={() => navigate('/lists/add')}>
                  Nouvelle liste
                </button>
                <button className="btn btn-outline-info" onClick={() => navigate('/')}>
                  Voir toutes les tâches
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;