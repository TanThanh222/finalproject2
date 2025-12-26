import { createContext, useEffect, useState } from "react";
import axiosClient, { withKey } from "../config/axiosClient";

export const AuthContext = createContext(null);

const STORAGE_KEY = "edupress_user";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } finally {
      setInitLoading(false);
    }
  }, []);

  const persistUser = (u) => {
    setUser(u);
    if (!u) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const login = async (email, password) => {
    setError("");
    try {
      setAuthLoading(true);

      const res = await axiosClient.post(withKey("/auth/login"), {
        email,
        password,
      });
      const authUser = res?.data?.data;

      const usersRes = await axiosClient.get(withKey("/resources/users"));
      const users = usersRes?.data?.data?.data || [];
      const found = users.find((u) => u.email === authUser?.email);

      const finalUser = {
        ...authUser,
        role: found?.role || "user",
      };

      persistUser(finalUser);
      return { success: true, data: finalUser };
    } catch (e) {
      const msg = e?.response?.data?.message || "Login failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (fullName, email, password, role = "user") => {
    setError("");
    try {
      setAuthLoading(true);

      const res = await axiosClient.post(withKey("/auth/register"), {
        fullName,
        email,
        password,
      });

      await axiosClient.post(withKey("/resources/users"), {
        fullName,
        email,
        role,
        createdAt: Date.now(),
      });

      return { success: true, data: res?.data?.data };
    } catch (e) {
      const msg = e?.response?.data?.message || "Register failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => persistUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        authLoading,
        initLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
