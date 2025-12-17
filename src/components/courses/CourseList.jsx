import { useContext } from "react";
import { CourseContext } from "../../context/CoursesContext";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const { courses, loading } = useContext(CourseContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
