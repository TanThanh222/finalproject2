import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./screens/Home";
import Listing from "./screens/Courses/Listing";
import Single from "./screens/Courses/Single";
import AuthPage from "./screens/Auth/AuthPage";
import AdminCourses from "./screens/Admin/AdminCourses";

import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<Listing />} />
          <Route path="/courses/:id" element={<Single />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/courses" element={<AdminCourses />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
