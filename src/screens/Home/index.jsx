import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function HomeScreen() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <p className="text-gray-600">
          Đây sẽ là nơi bạn dựng Figma Home Page sau này.
        </p>
      </main>
      <Footer />
    </>
  );
}
