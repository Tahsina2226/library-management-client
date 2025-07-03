import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/books", label: "All Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav className="top-0 z-50 sticky bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-lg border-b-2 border-blue-300 w-full">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex justify-center items-center bg-blue-500 shadow-md rounded-full w-10 h-10 text-white text-xl">
            📚
          </div>
          <h1 className="font-bold text-blue-900 text-xl tracking-wide">
            Library Management
          </h1>
        </div>

        <button
          onClick={toggleMenu}
          className="sm:hidden focus:outline-none text-blue-800 text-3xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        <div className="hidden sm:flex items-center gap-8 font-semibold text-blue-800 uppercase tracking-wider">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="before:bottom-0 before:left-0 before:absolute relative before:bg-blue-600 px-2 py-1 before:w-0 hover:before:w-full before:h-[2px] text-lg before:transition-all before:duration-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu - slide from right */}
      <div
        className={`sm:hidden flex flex-col items-start px-6 pb-4 gap-4 font-semibold text-blue-800 uppercase tracking-wider transition-all duration-300
          ${
            isOpen
              ? "block absolute top-16 right-0 bg-white shadow-md rounded-bl-lg rounded-br-lg w-48 z-50"
              : "hidden"
          }
        `}
      >
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className="before:bottom-0 before:left-0 before:absolute relative before:bg-blue-600 px-2 py-1 before:w-0 hover:before:w-full before:h-[2px] text-lg before:transition-all before:duration-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
