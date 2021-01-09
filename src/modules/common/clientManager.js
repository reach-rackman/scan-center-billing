import axios from 'axios';

export const scanSystemApi = axios.create({
    baseURL: 'http://localhost:3005',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});