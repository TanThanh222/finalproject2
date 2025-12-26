import axios from "axios";

export const API_KEY = "69401a35d814d2c97d9ff131";

const axiosClient = axios.create({
  baseURL: "https://mindx-mockup-server.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

export const withKey = (path) =>
  path.includes("?")
    ? `${path}&apiKey=${API_KEY}`
    : `${path}?apiKey=${API_KEY}`;

export default axiosClient;
