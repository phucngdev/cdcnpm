import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const BaseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// BaseUrl.interceptors.request.use((config) => {

//   return config;
// });

export default BaseUrl;
