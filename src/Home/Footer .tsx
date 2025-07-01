import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner mt-auto py-4 text-gray-600 text-center">
      <div className="mx-auto px-4 container">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}📚 Library Management. All rights
          reserved.
        </p>
        <p className="mt-1 text-xs">
          Developed by{" "}
          <a
            href="https://yourwebsite.com"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tahsina Tanvin
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
