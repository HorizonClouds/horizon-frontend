import config from '@/config';
import axios from 'axios';

const backendApiClient = axios.create({
    baseURL: config.gatewayURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

backendApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('horizon-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default backendApiClient;