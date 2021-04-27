import axios from 'axios';
import {
  authMiddlewareSuccess,
  authMiddlewareFailure
} from './middleware/auth';

const backend = axios.create({
  baseURL: process.env.BACKEND_URI
});

backend.interceptors.response.use(authMiddlewareSuccess, authMiddlewareFailure);

export default backend;
