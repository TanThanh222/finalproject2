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
import CourseList from "../../components/courses/CourseList.jsx";
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
import AddonsBanner from "../../assets/home/addons.png";
import SkillIllustration from "../../assets/home/skill.png";

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
          <CourseList courses={courses} limit={6} />
        </PageContainer>
      </section>

      <section className="bg-white pb-20">
        <PageContainer className="space-y-10">
          <div className="overflow-hidden rounded-4xl shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <img
              src={AddonsBanner}
              alt="LearnPress Add-Ons"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-2xl font-semibold text-[#FF782D]">25K+</p>
              <p className="mt-1 text-xs text-slate-500">Active Students</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-2xl font-semibold text-[#FF782D]">899</p>
              <p className="mt-1 text-xs text-slate-500">Total Courses</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-2xl font-semibold text-[#FF782D]">158</p>
              <p className="mt-1 text-xs text-slate-500">Instructor</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-2xl font-semibold text-[#FF782D]">100%</p>
              <p className="mt-1 text-xs text-slate-500">Satisfaction Rate</p>
            </div>
          </div>

          <div className="grid gap-10 items-center lg:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={SkillIllustration}
                alt="Grow your skill"
                className="w-full max-w-md lg:max-w-none"
              />
            </div>

            <div>
              <h2 className="mb-3 text-[24px] font-semibold text-slate-900">
                Grow Us Your Skill
                <br />
                With LearnPress LMS
              </h2>
              <p className="mb-4 text-sm text-slate-600">
                We denounce with righteous indignation and dislike men who are
                so beguiled and demoralized that cannot trouble.
              </p>

              <ul className="mb-6 space-y-2 text-sm text-slate-600">
                {[
                  "Certification",
                  "Certification",
                  "Certification",
                  "Certification",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF782D] text-[10px] text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton size="md">Explorer Course</PrimaryButton>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
