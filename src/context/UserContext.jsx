import { createContext, useEffect, useState } from "react";
import axiosClient, { withKey } from "../config/axiosClient";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const getUsers = async () => {
    try {
      setUserLoading(true);
      const res = await axiosClient.get(withKey("/resources/users"));
      const raw = res?.data?.data?.data;
      setUsers(Array.isArray(raw) ? raw : []);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, userLoading, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}
