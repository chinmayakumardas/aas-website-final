// src/api/AxiosInstance.js
import axios from 'axios';
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  
  baseURL: "http://13.234.53.180:8003/api",  // Use environment variable for base URL
 
});
 
// Intercept requests if needed (for token or authentication)
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
// Intercept responses to handle errors globally
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response); // Return error response data
    } else if (error.request) {
      return Promise.reject(error.request); // No response received
    } else {
      return Promise.reject(error.message); // Other errors
    }
  }
);
 
export default AxiosInstance;