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
    </>
  );
}
