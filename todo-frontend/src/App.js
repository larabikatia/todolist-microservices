import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ListForm from './components/ListForm';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/add" element={<TaskForm />} />
            <Route path="/tasks/edit/:id" element={<TaskForm />} />
            <Route path="/lists/add" element={<ListForm />} />
            <Route path="/lists/edit/:id" element={<ListForm />} />
            <Route path="/register" element={<UserForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;