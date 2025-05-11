import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
  getAllUsers() {
    return axios.get(API_URL);
  }

  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  registerUser(user) {
    return axios.post(`${API_URL}/register`, user);
  }

  updateUser(id, user) {
    return axios.put(`${API_URL}/${id}`, user);
  }

  deleteUser(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new UserService();