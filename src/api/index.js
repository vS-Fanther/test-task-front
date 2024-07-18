import axios from "axios";
import { useCookies } from "vue3-cookies";

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 100000,
});
const { cookies } = useCookies();

API.interceptors.request.use((config) => {
    const token = cookies.get('auth-token');

    if (config.headers) {
        config.headers['Content-Type'] = 'application/json';

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return config;
});

export default API;