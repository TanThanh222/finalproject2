export default function CourseCard({ course, variant = "grid" }) {
  const {
    title,
    category,
    instructor,
    weeks,
    students,
    price,
    oldPrice,
    thumbnail,
  } = course;

  const isFree = price === 0;
  const priceLabel = isFree ? "Free" : `$${price}.00`;
  const oldPriceLabel = oldPrice ? `$${oldPrice}.00` : null;

  if (variant === "grid") {
    return (
      <article className="flex flex-col overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="h-52 w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-medium text-white">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 py-4">
          <p className="mb-1 text-[11px] text-slate-500">by {instructor}</p>

          <h3 className="mb-3 text-sm font-semibold leading-snug text-slate-900">
            {title}
          </h3>

          <div className="mb-3 flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF782D]" />
              {weeks} Weeks
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {students} Students
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[#e5e7eb] pt-3 text-xs">
            <div className="flex items-baseline gap-2">
              {oldPriceLabel && (
                <span className="text-[11px] text-slate-400 line-through">
                  {oldPriceLabel}
                </span>
              )}
              <span className="text-sm font-semibold text-[#FF782D]">
                {priceLabel}
              </span>
            </div>

            <button className="text-[11px] font-semibold text-slate-900 transition-colors hover:text-[#FF782D]">
              View More
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
      <div className="relative w-[260px] shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-medium text-white">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="mb-1 text-[11px] text-slate-500">by {instructor}</p>

        <h3 className="mb-2 text-sm font-semibold leading-snug text-slate-900">
          {title}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span>🕒 {weeks} Weeks</span>
          <span>👥 {students} Students</span>
          <span>• All levels</span>
          <span>• 20 Lessons</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#e5e7eb] pt-3 text-xs">
          <div className="flex items-baseline gap-2">
            {oldPriceLabel && (
              <span className="text-[11px] text-slate-400 line-through">
                {oldPriceLabel}
              </span>
            )}
            <span className="text-sm font-semibold text-[#FF782D]">
              {priceLabel}
            </span>
            {isFree && (
              <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
                Free
              </span>
            )}
          </div>

          <button className="text-[11px] font-semibold text-slate-900 transition-colors hover:text-[#FF782D]">
            View More
          </button>
        </div>
      </div>
    </article>
  );
}
