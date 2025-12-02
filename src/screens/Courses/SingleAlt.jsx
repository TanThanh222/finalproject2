import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function CourseSingleAltScreen() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Course Single 2</h1>
        <p className="text-gray-600">
          Trang chi tiết khoá học phiên bản 2 (Curriculum detail).
        </p>
      </main>
      <Footer />
    </>
  );
}
