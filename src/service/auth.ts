// services/auth.ts
import axios from 'axios';
import { API_URL } from './apiConfig';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY || '16a91c59880c0387284be7beff8014c7ba034abf34718ff6725a7ca8292d39098acdf46b639c2e4ee6096790ab6cc890ad726374e822b8a0b1c8d6a46c48609a'; // Usa una clave segura desde las variables de entorno

export const login = async (email: string, password: string) => {
    try {
        // Realiza la solicitud de inicio de sesión
        const response = await axios.post(`${API_URL}login`, { email, password });
        // console.log('Respuesta de la API:', response);

        if (response.data && response.data.token) {
            // Aquí se asume que la API devuelve un token
            const token = response.data.token; // Usa el token devuelto por la API
            // console.log('Token:', token);
            // Generar un nuevo token JWT (si es necesario)
            const jwtToken = jwt.sign(
                { email }, // Solo incluye el email en el payload
                SECRET_KEY,
                { expiresIn: '1h' } // Establece la duración del token
            );

            // Serializar el token para almacenarlo en una cookie
            const serialized = serialize('myToken', jwtToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 días de expiración
            });

            // Almacenar el token en una cookie
            const test = document.cookie = serialized; // Establecer la cookie correctamente
            // console.log(test);
            // console.log('Login successful, token stored in cookie:', jwtToken);
            return response.data; // Retornar la respuesta completa si es necesario
        } else {
            throw new Error('No se recibió un token de autenticación.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const getProfile = async (token: string) => {
    // console.log('Token:', token);
    try {
        const response = await axios.get(`${API_URL}profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log('Profile data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const logout = async (token: string) => {
    // const myToken = localStorage.getItem('token');

    const response = await axios.post(`${API_URL}logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    document.cookie = serialize('myToken', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: -1, // Expira la cookie inmediatamente
    });

    return response.data;
};