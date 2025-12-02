import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function CourseListingScreen() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Course Listing (Grid)</h1>
        <p className="text-gray-600 mb-4">
          Sau này trang này sẽ hiển thị danh sách khoá học dạng grid giống Figma.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="h-24 bg-gray-200 rounded mb-3" />
              <h3 className="font-semibold text-sm mb-1">Course {i + 1}</h3>
              <p className="text-xs text-gray-500">
                Mô tả ngắn khoá học…
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
