import CourseCard from "./CourseCard.jsx";

export default function CourseList({ courses, limit }) {
  const data = limit ? courses.slice(0, limit) : courses;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
