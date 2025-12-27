import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axiosClient, { withKey } from "../config/axiosClient";
import useAuth from "../hook/useAuth";

export const CourseRegisterContext = createContext(null);

export default function CourseRegisterProvider({ children }) {
  const { user } = useAuth();

  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRegisters = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosClient.get(withKey("/resources/courseRegister"));
      const raw = res?.data?.data?.data;
      setRegisters(Array.isArray(raw) ? raw : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Get courseRegister failed");
      setRegisters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRegisters();
  }, [getRegisters]);
  const userId = user?.email ? String(user.email).toLowerCase().trim() : "";
  const myRegisters = useMemo(() => {
    const email = user?.email?.toLowerCase();
    if (!email) return [];
    return registers.filter((r) => String(r?.userId).toLowerCase() === email);
  }, [registers, user?.email]);

  const isRegistered = useCallback(
    (userId, courseId) => {
      if (!userId || !courseId) return false;
      return registers.some(
        (r) =>
          String(r.userId).toLowerCase() === String(userId).toLowerCase() &&
          String(r.courseId) === String(courseId)
      );
    },
    [registers]
  );

  const addRegister = async ({ userId: uId, courseId }) => {
    const uid = String(uId || "")
      .toLowerCase()
      .trim();
    const cid = String(courseId || "").trim();

    if (!uid || !cid)
      return { success: false, message: "Missing userId/courseId" };

    if (isRegistered(uid, cid)) {
      return { success: false, message: "Already enrolled" };
    }

    try {
      const payload = {
        timeRegister: Date.now(),
        userId: uid,
        courseId: cid,
      };

      const res = await axiosClient.post(
        withKey("/resources/courseRegister"),
        payload
      );

      await getRegisters();
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Enroll failed",
      };
    }
  };

  const removeRegister = async (registerId) => {
    try {
      if (!registerId) return { success: false, message: "Missing registerId" };

      const res = await axiosClient.delete(
        withKey(`/resources/courseRegister/${registerId}`)
      );

      await getRegisters();
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Cancel failed",
      };
    }
  };

  return (
    <CourseRegisterContext.Provider
      value={{
        registers,
        myRegisters,
        loading,
        error,
        getRegisters,
        addRegister,
        removeRegister,
        isRegistered,
      }}
    >
      {children}
    </CourseRegisterContext.Provider>
  );
}
