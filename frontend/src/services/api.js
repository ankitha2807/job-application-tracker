import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (fullName, email, password) => api.post('/auth/signup', { fullName, email, password });

export const getJobs = () => api.get('/jobs');
export const getJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (job) => api.post('/jobs', job);
export const updateJob = (id, job) => api.put(`/jobs/${id}`, job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
export const getDashboardStats = () => api.get('/dashboard/stats');

export const generateCoverLetter = (jobDescription, skills) => api.post('/cover-letter/generate', { jobDescription, skills });

export default api;
