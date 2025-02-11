import axios from 'axios';
import { API_URL } from './apiConfig';

// Configura un interceptor para agregar el token a las solicitudes
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Exporta la instancia de axios
const axiosInstance = axios.create({
    baseURL: API_URL,
});

export default axiosInstance;