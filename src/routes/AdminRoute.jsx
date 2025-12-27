import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  const role = user?.role;
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
