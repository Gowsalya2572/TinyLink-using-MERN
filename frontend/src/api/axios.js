import axios from 'axios';
const baseURL = 'tiny-link-backend-gules.vercel.app/api' ;
export const api = axios.create({ baseURL, timeout: 5000 });
