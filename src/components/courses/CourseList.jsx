import { useContext } from "react";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "./CourseCard";

export default function CourseList({ courses: propCourses, limit = 6 }) {
  const { courses: contextCourses, courseLoading } = useContext(CourseContext);

  const courses = propCourses || contextCourses;

  if (courseLoading) {
    return <p className="text-sm text-slate-500">Loading...</p>;
  }

  if (!courses || courses.length === 0) {
    return <p className="text-sm text-slate-500">No courses found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {courses.slice(0, limit).map((course) => (
        <CourseCard key={course?._id || course?.id} course={course} />
      ))}
    </div>
  );
}
