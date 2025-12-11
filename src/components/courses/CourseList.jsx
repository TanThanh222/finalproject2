import CourseCard from "./CourseCard.jsx";

export default function CourseList({ courses, limit = 6 }) {
  const visibleCourses = courses.slice(0, limit);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {visibleCourses.map((course) => (
        <CourseCard key={course.id} course={course} variant="grid" />
      ))}
    </div>
  );
}
