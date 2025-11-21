import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8003/api' ;
export const api = axios.create({ baseURL, timeout: 5000 });
