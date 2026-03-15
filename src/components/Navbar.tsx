import logo from "@/assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1f3b57]/95 backdrop-blur-md shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-7">

        <div className="flex items-center justify-between h-14 text-white">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">

            <img
              src={logo}
              alt="GO CLEAN"
              className="h-7 sm:h-8"
            />

            <span className="text-lg sm:text-xl font-bold tracking-wide">
              GO.CLEAN
            </span>

          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

            <NavLink to="/">HOME</NavLink>
            <NavLink to="/recycling">RECYCLING</NavLink>
            <NavLink to="/report">REPORT</NavLink>
            <NavLink to="/about">ABOUT</NavLink>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="md:hidden bg-[#1f3b57] text-white px-6 pb-4 flex flex-col gap-4">

          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>

          <NavLink to="/login" onClick={() => setOpen(false)}>
            Login
          </NavLink>

          <NavLink to="/signup" onClick={() => setOpen(false)}>
            Signup
          </NavLink>

        </div>

      )}

    </nav>

  );

};

export default Navbar;