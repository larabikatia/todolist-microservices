import axios from 'axios';

const API_URL = 'http://localhost:8080/api/lists';

class ListService {
  getAllLists() {
    return axios.get(API_URL);
  }

  getListsByUser(userId) {
    return axios.get(`${API_URL}/user/${userId}`);
  }

  getListById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createList(list) {
    return axios.post(API_URL, list);
  }

  updateList(id, list) {
    return axios.put(`${API_URL}/${id}`, list);
  }

  deleteList(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ListService();