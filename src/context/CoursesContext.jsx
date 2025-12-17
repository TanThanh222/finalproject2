import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CourseContext = createContext();

const API_KEY = "69401a35d814d2c97d9ff131";
const BASE_URL = "https://mindx-mockup-server.vercel.app/api/resources/courses";

export default function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}?apiKey=${API_KEY}`);
      const raw = res?.data?.data?.data;
      setCourses(Array.isArray(raw) ? raw : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, getCourses }}>
      {children}
    </CourseContext.Provider>
  );
}
