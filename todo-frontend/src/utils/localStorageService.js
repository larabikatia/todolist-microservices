// src/utils/localStorageService.js
const PREFIX = 'todo_app_';

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(`${PREFIX}${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Utilisation pour les tâches avec fallback
export const getTasks = async (taskService) => {
  try {
    const response = await taskService.getAllTasks();
    const tasks = response.data;
    // Sauvegarde en cas de succès
    saveToLocalStorage('tasks', tasks);
    return tasks;
  } catch (error) {
    console.warn('Error fetching tasks, using cached data', error);
    // Utilisation du cache en cas d'erreur
    return getFromLocalStorage('tasks', []);
  }
};