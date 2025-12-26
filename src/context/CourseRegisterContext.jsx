import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axiosclient, { withKey } from "../config/axiosClient.js";
import useAuth from "../hook/useAuth";

export const CourseRegisterContext = createContext(null);

export default function CourseRegisterProvider({ children }) {
  const { user } = useAuth();

  const [registers, setRegisters] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [error, setError] = useState("");

  const getRegisters = useCallback(async () => {
    try {
      setRegLoading(true);
      setError("");
      const res = await axiosclient.get(withKey("/resources/courseRegister"));
      const raw = res?.data?.data?.data;
      setRegisters(Array.isArray(raw) ? raw : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Get courseRegister failed");
      setRegisters([]);
    } finally {
      setRegLoading(false);
    }
  }, []);

  useEffect(() => {
    getRegisters();
  }, [getRegisters]);

  const myRegisters = useMemo(() => {
    const userId = user?.email || user?._id;
    if (!userId) return [];
    return registers.filter((r) => String(r?.userId) === String(userId));
  }, [registers, user?.email, user?._id]);

  const isRegistered = useCallback(
    (userId, courseId) => {
      if (!userId || !courseId) return false;
      return registers.some(
        (r) =>
          String(r?.userId) === String(userId) &&
          String(r?.courseId) === String(courseId)
      );
    },
    [registers]
  );

  const addRegister = useCallback(
    async ({ userId, courseId }) => {
      try {
        if (!userId || !courseId) {
          return { success: false, message: "Missing userId/courseId" };
        }

        if (isRegistered(userId, courseId)) {
          return { success: false, message: "Already enrolled" };
        }

        setRegLoading(true);

        const payload = {
          timeRegister: Date.now(),
          userId,
          courseId,
        };

        const res = await axiosclient.post(
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
      } finally {
        setRegLoading(false);
      }
    },
    [getRegisters, isRegistered]
  );

  const removeRegister = useCallback(
    async (registerId) => {
      try {
        if (!registerId) return { success: false, message: "Missing id" };

        setRegLoading(true);
        await axiosclient.delete(
          withKey(`/resources/courseRegister/${registerId}`)
        );

        await getRegisters();
        return { success: true };
      } catch (e) {
        return {
          success: false,
          message: e?.response?.data?.message || "Cancel failed",
        };
      } finally {
        setRegLoading(false);
      }
    },
    [getRegisters]
  );

  return (
    <CourseRegisterContext.Provider
      value={{
        registers,
        myRegisters,
        regLoading,
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
