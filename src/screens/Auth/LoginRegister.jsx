import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function LoginRegisterScreen() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Login / Register</h1>
        <p className="text-gray-600">
          Ở đây bạn sẽ dựng hai form Login / Register giống Figma.
        </p>
      </main>
      <Footer />
    </>
  );
}
