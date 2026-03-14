import { Leaf } from 'lucide-react';
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
            <Leaf className="w-7 h-7 text-green-400" />
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
              {({ isActive }) => (
                <span className="relative">
                  HOME
                  {isActive && (
                    <span className=" left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded"></span>
                  )}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/recycling"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  RECYCLING
                  {isActive && (
                    <span className="left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded"></span>
                  )}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  REPORT
                  {isActive && (
                    <span className="left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded"></span>
                  )}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition relative ${
                  isActive ? 'text-green-400' : 'hover:text-green-300'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  ABOUT
                  {isActive && (
                    <span className="left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded"></span>
                  )}
                </span>
              )}
            </NavLink>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;