import axios from 'axios';

const axiosInstance = axios.create({
//   baseURL: import.meta.env.BASE_URL, 
  baseURL: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is crucial for cookies
});


export default axiosInstance;