import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
  const { user, initLoading } = useAuth();

  if (initLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
