import PageContainer from "../../components/layout/PageContainer.jsx";
import HeroBG from "../../assets/home/hero-student.png";
import PrimaryButton from "../../components/common/PrimaryButton.jsx";

export default function HomeScreen() {
  return (
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
  );
}
