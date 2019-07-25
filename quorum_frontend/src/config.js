import axios from 'axios';
import { backendAPIs } from './strings/api';

const axiosInstance = axios.create({
	baseURL: backendAPIs.BASE
});

export default axiosInstance;
