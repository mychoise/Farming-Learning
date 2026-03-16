import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // point to your deployed backend
  withCredentials: true, // if using cookies
});
