import { useContext } from "react";
import { CourseRegisterContext } from "../context/CourseRegisterContext";
export default function useCourseRegister() {
  return useContext(CourseRegisterContext);
}
