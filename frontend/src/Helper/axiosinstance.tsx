import axios, { InternalAxiosRequestConfig } from "axios";
import secureLocalStorage from "react-secure-storage";

const jwt = secureLocalStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:5022/",
  timeout: 300,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    if (jwt) {
      request.headers.Authorization = `Bearer ${jwt}`;
    } else {
      Promise.reject(new Error("JWT token is not available"));
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
