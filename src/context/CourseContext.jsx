import { createContext, useEffect, useState } from "react";
import axiosclient, { withKey } from "../config/axiosClient.js";
export const CourseContext = createContext(null);
export default function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);
  const [error, setError] = useState("");
  const getCourses = async () => {
    setError("");
    try {
      setCourseLoading(true);
      const res = await axiosclient.get(withKey("/resources/courses"));
      const raw = res?.data?.data?.data;
      setCourses(Array.isArray(raw) ? raw : []);
    } catch (e) {
      setError(e?.response?.data?.message || "Get courses failed");
      setCourses([]);
    } finally {
      setCourseLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const createCourse = async (payload) => {
    try {
      const res = await axiosclient.post(
        withKey("/resources/courses"),
        payload
      );
      await getCourses();
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Create course failed",
      };
    }
  };

  const updateCourse = async (mongoId, payload) => {
    try {
      const res = await axiosclient.put(
        withKey(`/resources/courses/${mongoId}`),
        payload
      );
      await getCourses();
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Update course failed",
      };
    }
  };

  const deleteCourse = async (mongoId) => {
    try {
      const res = await axiosclient.delete(
        withKey(`/resources/courses/${mongoId}`)
      );
      await getCourses();
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return {
        success: false,
        message: e?.response?.data?.message || "Delete course failed",
      };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        courseLoading,
        error,
        getCourses,
        createCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
