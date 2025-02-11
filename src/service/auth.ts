// services/auth.ts
import axios from 'axios';
import { API_URL } from './apiConfig';


export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}logout`, {}, { // Usa API_URL aquí
        headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de enviar el token aquí
        },
    });
    return response.data;
};