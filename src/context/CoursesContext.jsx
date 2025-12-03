import { createContext, useState } from "react";
import coursesData from "../data/courses.js";

export const CoursesContext = createContext();

export default function CoursesProvider({ children }) {
  const [courses] = useState(coursesData);
  const value = { courses };
  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}
