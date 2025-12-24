import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('user');
    },
};

export const taskService = {
    create: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/tasks');
        return response.data;
    },
    update: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};

export default api;
