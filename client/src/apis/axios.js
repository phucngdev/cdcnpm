import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const BaseUrl = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "https://e677-42-114-170-105.ngrok-free.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// BaseUrl.interceptors.request.use(async (config) => {
//   const accessToken = Cookies.get("accessToken");
//   const refreshToken = Cookies.get("refreshToken");
//   console.log(accessToken, refreshToken);

//   if (!accessToken && refreshToken) {
//     await refreshToken();
//   }
//   return config;
// });

export default BaseUrl;
