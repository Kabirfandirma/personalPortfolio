import axios from 'axios';

// Development (localhost) vs Production (Render) base URL
const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://your-render-backend-url.onrender.com'
    : 'http://localhost:5000';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});