import PageContainer from "../../components/layout/PageContainer.jsx";
import HeroBG from "../../assets/home/hero-student.png";
import PrimaryButton from "../../components/common/PrimaryButton.jsx";
import {
  ArtIcon,
  DevelopmentIcon,
  CommunicationtIcon,
  VideoIcon,
  PhotoIcon,
  MarketingIcon,
  ContentIcon,
  FinanceIcon,
  ScienceIcon,
  NetworkIcon,
} from "../../assets/icons/category.jsx";
import courses from "../../data/courses.jsx";

const categories = [
  { id: 1, title: "Art & Design", courses: 38, Icon: ArtIcon },
  { id: 2, title: "Development", courses: 38, Icon: DevelopmentIcon },
  { id: 3, title: "Communication", courses: 38, Icon: CommunicationtIcon },
  { id: 4, title: "Videography", courses: 38, Icon: VideoIcon },
  { id: 5, title: "Photography", courses: 38, Icon: PhotoIcon },
  { id: 6, title: "Marketing", courses: 38, Icon: MarketingIcon },
  { id: 7, title: "Content Writing", courses: 38, Icon: ContentIcon },
  { id: 8, title: "Finance", courses: 38, Icon: FinanceIcon },
  { id: 9, title: "Science", courses: 38, Icon: ScienceIcon },
  { id: 10, title: "Network", courses: 38, Icon: NetworkIcon },
];

function CategoryCard({ title, courses, Icon }) {
  return (
    <div
      className="
        group cursor-pointer
        flex flex-col items-center justify-center
        rounded-2xl border border-[#e5e7eb] bg-white px-6 py-6 text-center
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(255,120,45,0.20)]
        hover:border-[#FF782D]
      "
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1E8] text-[#FF782D]">
        {Icon && <Icon />}
      </div>

      <h3
        className="
          mb-1 text-sm font-semibold text-slate-900
          transition-colors duration-300 group-hover:text-[#FF782D]
        "
      >
        {title}
      </h3>

      <p
        className="
          text-xs text-slate-500
          transition-colors duration-300 group-hover:text-[#FF782D]
        "
      >
        {courses} Courses
      </p>
    </div>
  );
}

function CourseCard({ course }) {
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

export default function HomeScreen() {
  return (
    <>
      <section
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <PageContainer className="py-20 lg:py-28">
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl lg:text-[48px] font-bold leading-tight text-slate-900">
              Build Skills With <br /> Online Course
            </h1>
            <p className="text-slate-600 text-base">
              We denounce with righteous indignation and dislike men who are so
              beguiled and demoralized that cannot trouble.
            </p>
            <PrimaryButton size="lg">Posts Comment</PrimaryButton>
          </div>
        </PageContainer>
      </section>
      <section className="bg-white py-20">
        <PageContainer>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[32px] font-semibold text-slate-900">
                Top Categories
              </h2>
              <p className="text-base text-slate-500">
                Explore our Popular Categories
              </p>
            </div>
            <PrimaryButton variant="outline" size="sm">
              All Categories
            </PrimaryButton>
          </div>

          <div className="grid gap-4 md:grid-cols-5 md:gap-5">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                courses={cat.courses}
                Icon={cat.Icon}
                featured={cat.featured}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-white py-20">
        <PageContainer>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[24px] font-semibold text-slate-900 leading-tight">
                Featured Courses
              </h2>
              <p className="text-sm text-slate-500">
                Explore our Popular Courses
              </p>
            </div>

            <PrimaryButton variant="outline" size="sm">
              All Courses
            </PrimaryButton>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
