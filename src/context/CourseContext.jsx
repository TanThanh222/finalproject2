import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setCourseLoading(true);

      const res = await axiosClient.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Fetch courses error:", err.response?.data || err);
    } finally {
      setCourseLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (data) => {
    try {
      await axiosClient.post("/courses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchCourses();
      return { success: true };
    } catch (err) {
      console.error("Create course error:", err.response?.data || err);
      return {
        success: false,
        message: err.response?.data?.message || "Create failed",
      };
    }
  };

  const updateCourse = async (id, data) => {
    try {
      await axiosClient.put(`/courses/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchCourses();
      return { success: true };
    } catch (err) {
      console.error("Update course error:", err.response?.data || err);
      return {
        success: false,
        message: err.response?.data?.message || "Update failed",
      };
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axiosClient.delete(`/courses/${id}`);

      await fetchCourses();
      return { success: true };
    } catch (err) {
      console.error("Delete course error:", err.response?.data || err);
      return {
        success: false,
        message: err.response?.data?.message || "Delete failed",
      };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        courseLoading,
        createCourse,
        updateCourse,
        deleteCourse,
        fetchCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
