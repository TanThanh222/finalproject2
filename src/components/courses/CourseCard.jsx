import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMG = "/assets/courses/placeholder.png";

function resolveCourseThumb(thumbnail) {
  if (!thumbnail) return FALLBACK_IMG;
  if (/^https?:\/\//i.test(thumbnail)) return thumbnail;
  return `/assets/courses/${thumbnail}`;
}

export default function CourseCard({ course, variant = "grid" }) {
  const navigate = useNavigate();
  const isGrid = variant === "grid";

  const thumbSrc = useMemo(
    () => resolveCourseThumb(course?.thumbnail),
    [course?.thumbnail]
  );

  const handleViewDetail = () => {
    const id = course?._id || course?.id;
    if (!id) {
      console.warn("Course id not found", course);
      return;
    }
    navigate(`/courses/${id}`);
  };

  const CourseImage = (
    <img
      src={thumbSrc}
      alt={course?.title || "Course"}
      className="h-full w-full object-cover"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );

  const Price = (
    <span className="text-sm font-bold text-[#FF782D]">
      {course?.price === 0 ? "Free" : course?.price ? `$${course.price}` : "-"}
    </span>
  );

  if (isGrid) {
    return (
      <article className="overflow-hidden rounded-3xl bg-white border border-[#e5e7eb] shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
          {CourseImage}
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] text-white">
            {course?.category || "Category"}
          </span>
        </div>

        <div className="space-y-2 px-5 py-4">
          <p className="text-[11px] text-slate-500">
            by {course?.instructor || "Unknown"}
          </p>

          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900">
            {course?.title || "Untitled course"}
          </h3>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>⏱ {course?.weeks ?? "-"} Weeks</span>
            <span>👥 {course?.students ?? "-"} Students</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            {(course?.oldPrice ?? 0) > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${course.oldPrice}
              </span>
            )}
            {Price}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleViewDetail}
              className="text-xs font-semibold text-[#FF782D] hover:underline"
            >
              View More
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-4 rounded-3xl bg-white border border-[#e5e7eb] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="relative h-[110px] w-[180px] shrink-0 overflow-hidden rounded-2xl">
        {CourseImage}
        <span className="absolute left-2 top-2 rounded-full bg-slate-900/85 px-2.5 py-1 text-[10px] text-white">
          {course?.category || "Category"}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[11px] text-slate-500">
            by {course?.instructor || "Unknown"}
          </p>

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
            {course?.title || "Untitled course"}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>⏱ {course?.weeks ?? "-"} Weeks</span>
            <span>👥 {course?.students ?? "-"} Students</span>
            {course?.level && <span>{course.level}</span>}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(course?.oldPrice ?? 0) > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${course.oldPrice}
              </span>
            )}
            {Price}
          </div>

          <button
            type="button"
            onClick={handleViewDetail}
            className="text-xs font-semibold text-[#FF782D] hover:underline"
          >
            View More
          </button>
        </div>
      </div>
    </article>
  );
}
