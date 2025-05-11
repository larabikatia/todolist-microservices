// Composant TaskItem amélioré
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        setIsDeleting(false);
      }
    }
  };
  
  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.id, !task.completed);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Pas de date d\'échéance';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };
  
  return (
    <div className={`card mb-3 ${task.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              id={`task-${task.id}`}
            />
            <label className="form-check-label visually-hidden" htmlFor={`task-${task.id}`}>
              Marquer comme terminée
            </label>
          </div>
          <h5 className={`card-title mb-0 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
          </h5>
          <span className="ms-auto badge bg-primary">
            {task.listId ? 'Liste #' + task.listId : 'Sans liste'}
          </span>
        </div>
        
        {task.description && (
          <p className="card-text">{task.description}</p>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {task.dueDate ? (
              <>Échéance: <span className="fw-bold">{formatDate(task.dueDate)}</span></>
            ) : 'Pas de date d\'échéance'}
          </small>
          
          <div>
            <Link to={`/tasks/edit/${task.id}`} className="btn btn-sm btn-outline-primary me-2">
              Modifier
            </Link>
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Suppression...</span>
                </>
              ) : 'Supprimer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;