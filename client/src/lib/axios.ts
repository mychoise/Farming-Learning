import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: "http://localhost:3000/api", // point to your deployed backend
  withCredentials: true, // if using cookies
});


// 🔐 Add this interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkNmIyMDY5LThhMjUtNGI5Zi04NDZiLWIyZGZlNWZlYzM4MiIsImlhdCI6MTc3NDQ1Mzc1NCwiZXhwIjoxNzc0NDU0NjU0fQ.08Cp6ki1_oFM9ScktpAGQ5LzKv4XEpyt2XJdwMxsbJQ" ; // or sessionStorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
);
