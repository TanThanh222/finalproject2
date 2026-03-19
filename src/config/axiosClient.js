import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      token = token.replace(/^"|"$/g, "").trim();
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosClient;
