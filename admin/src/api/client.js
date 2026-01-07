import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // Unauthorized → clear token and optionally redirect
      localStorage.removeItem('adminToken');
      // window.location.href = '/login'; // avoid hard redirect in library file
    }
    return Promise.reject(err);
  }
);

export default client;