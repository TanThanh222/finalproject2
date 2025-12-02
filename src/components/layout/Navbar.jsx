import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm mb-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          EduPress
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink to="/" className="hover:text-orange-500">
            Home
          </NavLink>
          <NavLink to="/courses" className="hover:text-orange-500">
            Courses
          </NavLink>
          <NavLink to="/course-single-alt/c1" className="hover:text-orange-500">
            Course Single 2
          </NavLink>
          <NavLink to="/login" className="hover:text-orange-500">
            Login / Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
