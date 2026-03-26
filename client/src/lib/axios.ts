import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: "http://localhost:3000/api", // point to your deployed backend
  withCredentials: true, // if using cookies
});


// 🔐 Add this interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkNmIyMDY5LThhMjUtNGI5Zi04NDZiLWIyZGZlNWZlYzM4MiIsImlhdCI6MTc3NDUxOTkxMSwiZXhwIjoxNzc0NTIwODExfQ.CeryoAO0RMwoCVnx8fQvg28YXo8q-8m7xj2CyFqgEKM" ; // or sessionStorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
);
