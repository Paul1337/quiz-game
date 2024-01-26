import axios from 'axios';
import { authLocalStore } from '../../auth/local-store/authLocalStore';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        common: {
            Authorization: `Bearer ${authLocalStore.getAuthToken()}`,
        },
    },
});

// axiosInstance.defaults.headers['Authorization'] = `Bearer ${authLocalStore.getAuthToken()}`;
