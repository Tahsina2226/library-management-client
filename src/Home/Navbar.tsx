import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-100 shadow-md p-4 rounded-md text-blue-800">
      <h1 className="font-semibold text-xl tracking-wide">
        📚 Library Management
      </h1>
      <div className="space-x-6">
        <Link
          to="/books"
          className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
        >
          All Books
        </Link>
        <Link
          to="/create-book"
          className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
        >
          Add Book
        </Link>
        <Link
          to="/borrow-summary"
          className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
        >
          Borrow Summary
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
