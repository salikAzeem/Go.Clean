import logo from "@/assets/logo.jpg";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1f3b57]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex items-center justify-between h-14 text-white">

          {/* LOGO */}
          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="GO CLEAN"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-wide">GO.CLEAN</span>
          </NavLink>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/recycling"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              RECYCLING
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              REPORT
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              ABOUT
            </NavLink>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;