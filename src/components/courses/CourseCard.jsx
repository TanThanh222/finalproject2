export default function CourseCard({ course }) {
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

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="relative">
        <img src={thumbnail} alt={title} className="h-52 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-medium text-white">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="mb-1 text-[11px] text-slate-500">by {instructor}</p>

        <h3 className="mb-3 text-sm font-semibold text-slate-900 leading-snug">
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

          <button className="text-[11px] font-semibold text-slate-900 hover:text-[#FF782D] transition-colors">
            View More
          </button>
        </div>
      </div>
    </article>
  );
}
