// src/context/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message, type = 'info', timeout = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    if (timeout) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

// Composant pour afficher les notifications
export const Notifications = () => {
  const { notifications, removeNotification } = useNotification();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="notification-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {notifications.map(({ id, message, type }) => (
        <div 
          key={id} 
          className={`toast show alert alert-${type} mb-2`}
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => removeNotification(id)}
            ></button>
          </div>
          <div className="toast-body">
            {message}
          </div>
        </div>
      ))}
    </div>
  );
};