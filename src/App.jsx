import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomeScreen from "./screens/Home/index.jsx";
import CourseListingScreen from "./screens/Courses/Listing.jsx";
import Single from "./screens/Courses/Single.jsx";
import LoginPage from "./screens/Auth/LoginPage.jsx";
import RegisterPage from "./screens/Auth/RegisterPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/courses" element={<CourseListingScreen />} />
        <Route path="/courses/:id" element={<Single />} />{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
