import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/Home/index.jsx";
import LoginRegisterScreen from "./screens/Auth/LoginRegister.jsx";
import CourseListingScreen from "./screens/Courses/Listing.jsx";
import CourseSingleScreen from "./screens/Courses/Single.jsx";
import CourseSingleAltScreen from "./screens/Courses/SingleAlt.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="" element={<HomeScreen />} />
      <Route path="/loginres" element={<LoginRegisterScreen />} />
      <Route path="/courses" element={<CourseListingScreen />} />
      <Route path="/course-single/:id" element={<CourseSingleScreen />} />
      <Route
        path="/course-single-alt/:id"
        element={<CourseSingleAltScreen />}
      />
    </Routes>
  );
}
