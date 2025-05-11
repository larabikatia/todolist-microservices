// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, ThemeToggle } from './context/ThemeContext';
import { NotificationProvider, Notifications } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ListForm from './components/ListForm';
import UserForm from './components/UserForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <ErrorBoundary>
            <div className="App">
              <NavBar />
              <div className="container mt-4">
                <Notifications />
                <Routes>
                  <Route path="/" element={<TaskList />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks/add" element={<TaskForm />} />
                  <Route path="/tasks/edit/:id" element={<TaskForm />} />
                  <Route path="/lists/add" element={<ListForm />} />
                  <Route path="/lists/edit/:id" element={<ListForm />} />
                  <Route path="/register" element={<UserForm />} />
                </Routes>
              </div>
            </div>
          </ErrorBoundary>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;