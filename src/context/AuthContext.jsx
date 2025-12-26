import { createContext, useEffect, useMemo, useState } from "react";
import axiosClient, { withKey } from "../config/axiosClient";
export const AuthContext = createContext(null);
const USER_KEY = "edupress_user";
const CRED_KEY = "edupress_creds";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [error, setError] = useState("");
  const [creds, setCreds] = useState({});
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedCreds = localStorage.getItem(CRED_KEY);
      if (storedCreds) setCreds(JSON.parse(storedCreds));
    } finally {
      setInitLoading(false);
    }
  }, []);

  const persistUser = (u) => {
    setUser(u);
    if (!u) localStorage.removeItem(USER_KEY);
    else localStorage.setItem(USER_KEY, JSON.stringify(u));
  };

  const persistCreds = (updater) => {
    setCreds((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(CRED_KEY, JSON.stringify(next));
      return next;
    });
  };

  const login = async (email, password) => {
    setError("");
    const emailLower = String(email || "")
      .toLowerCase()
      .trim();
    const passStr = String(password || "");

    try {
      setAuthLoading(true);

      const res = await axiosClient.get(withKey("/resources/users"));
      const raw = res?.data?.data?.data;
      const users = Array.isArray(raw) ? raw : [];

      const found = users.find(
        (u) => String(u?.email || "").toLowerCase() === emailLower
      );

      if (!found) {
        const msg = "Email không tồn tại";
        setError(msg);
        return { success: false, message: msg };
      }

      const serverPass =
        found?.password != null ? String(found.password) : null;
      const localPass =
        creds[emailLower] != null ? String(creds[emailLower]) : null;

      const ok =
        (serverPass !== null && serverPass === passStr) ||
        (serverPass === null && localPass !== null && localPass === passStr);

      if (!ok) {
        const msg = "Sai email hoặc mật khẩu";
        setError(msg);
        return { success: false, message: msg };
      }

      const safeUser = { ...found };
      delete safeUser.password;

      persistUser(safeUser);
      return { success: true, data: safeUser };
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
    const emailLower = String(email || "")
      .toLowerCase()
      .trim();
    const passStr = String(password || "");

    try {
      setAuthLoading(true);

      const resList = await axiosClient.get(withKey("/resources/users"));
      const raw = resList?.data?.data?.data;
      const users = Array.isArray(raw) ? raw : [];
      const existed = users.some(
        (u) => String(u?.email || "").toLowerCase() === emailLower
      );

      if (existed) {
        const msg = "Email đã tồn tại, hãy dùng email khác";
        setError(msg);
        return { success: false, message: msg };
      }

      const payload = {
        fullName,
        email: emailLower,
        password: passStr,
        role,
        createdAt: Date.now(),
      };
      const res = await axiosClient.post(withKey("/resources/users"), payload);
      persistCreds((prev) => ({ ...prev, [emailLower]: passStr }));

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
  const loading = useMemo(
    () => authLoading || initLoading,
    [authLoading, initLoading]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        loading,
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
