import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

class TaskService {
  getAllTasks() {
    return axios.get(API_URL);
  }

  getTasksByUser(userId) {
    return axios.get(`${API_URL}/user/${userId}`);
  }

  getTaskById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createTask(task) {
    return axios.post(API_URL, task);
  }

  updateTask(id, task) {
    return axios.put(`${API_URL}/${id}`, task);
  }

  deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new TaskService();