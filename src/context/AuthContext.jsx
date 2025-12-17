import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_KEY = "69401a35d814d2c97d9ff131";
const BASE_URL = "https://mindx-mockup-server.vercel.app/api/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("edupress_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/login?apiKey=${API_KEY}`, {
        email,
        password,
      });

      const userData = res.data?.data;
      setUser(userData);
      localStorage.setItem("edupress_user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/register?apiKey=${API_KEY}`, {
        fullName,
        email,
        password,
      });

      return { success: true, data: res.data?.data };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Register failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edupress_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
