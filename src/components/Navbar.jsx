import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          AI Exam Prep
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-8 font-medium">
          <li>
            <Link to="/" className="hover:text-cyan-300 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-cyan-300 transition">
              Features
            </Link>
          </li>

          <li>
            <Link to="/dashboard" className="hover:text-cyan-300 transition">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/login" className="hover:text-cyan-300 transition">
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/signup"
              className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;