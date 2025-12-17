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
    if (!id) return;
    navigate(`/courses/${id}`);
  };

  const CourseImage = (
    <img
      src={thumbSrc}
      alt={course?.title || "Course"}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );

  if (isGrid) {
    return (
      <article className="overflow-hidden rounded-3xl bg-white border border-[#e5e7eb] shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="relative w-full h-[180px] overflow-hidden rounded-t-3xl">
          {CourseImage}
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] text-white">
            {course?.category || "Category"}
          </span>
        </div>

        <div className="px-5 py-4 space-y-2">
          <p className="text-[11px] text-slate-500">
            by {course?.instructor || "Unknown"}
          </p>

          <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
            {course?.title || "Untitled course"}
          </h3>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>⏱ {course?.weeks ?? "-"} Weeks</span>
            <span>👥 {course?.students ?? "-"} Students</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            {(course?.oldPrice ?? 0) > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${course.oldPrice}
              </span>
            )}
            <span className="text-sm font-bold text-[#FF782D]">
              {course?.price === 0 ? "Free" : `$${course?.price ?? "-"}`}
            </span>
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
    <article className="flex gap-4 rounded-3xl bg-white border border-[#e5e7eb] shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-4">
      <div className="relative w-[180px] h-[110px] overflow-hidden rounded-2xl shrink-0">
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

          <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
            {course?.title || "Untitled course"}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>⏱ {course?.weeks ?? "-"} Weeks</span>
            <span>👥 {course?.students ?? "-"} Students</span>
            <span>{course?.level || ""}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(course?.oldPrice ?? 0) > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${course.oldPrice}
              </span>
            )}
            <span className="text-sm font-bold text-[#FF782D]">
              {course?.price === 0 ? "Free" : `$${course?.price ?? "-"}`}
            </span>
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
