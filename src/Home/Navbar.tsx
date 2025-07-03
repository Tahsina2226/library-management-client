import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      className="top-0 z-50 sticky flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-lg px-6 py-4 border-b-2 border-blue-300 w-full"
    >
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <div className="flex justify-center items-center bg-blue-500 shadow-md rounded-full w-10 h-10 text-white text-xl">
          📚
        </div>
        <h1 className="font-bold text-blue-900 text-xl tracking-wide">
          Library Management
        </h1>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-6 font-semibold text-blue-800 uppercase tracking-wider">
        {[
          { to: "/books", label: "All Books" },
          { to: "/create-book", label: "Add Book" },
          { to: "/borrow-summary", label: "Borrow Summary" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
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
