import config from '@/config';
import axios from 'axios';

// Remove /frontend from the base URL
const gatewayURL = config.gatewayURL.replace('/frontend', '');

const backendApiClient = axios.create({
    baseURL: gatewayURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('gatewayURL', gatewayURL);

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