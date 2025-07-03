import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/Tahsina2226",
      label: "GitHub",
      icon: <FaGithub size={24} />,
    },
    {
      href: "https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/",
      label: "LinkedIn",
      icon: <FaLinkedin size={24} />,
    },
    {
      href: "mailto:tahsinatanvin274@gmail.com",
      label: "Email",
      icon: <FaEnvelope size={24} />,
    },
  ];

  return (
    <footer className="flex flex-col items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-lg px-6 py-6 border-t-2 border-blue-300 w-full text-blue-800">
      <p className="mb-2 font-semibold text-base tracking-wide">
        &copy; {new Date().getFullYear()} 📚 Library Management System. All
        rights reserved.
      </p>
      <p className="mb-4 max-w-xl text-blue-700 text-center italic">
        A simple and intuitive app to manage your books easily and efficiently.
        Built with React, Redux Toolkit, TypeScript & Tailwind CSS
      </p>

      <p className="mt-2 font-semibold text-blue-700 text-sm">
        Developed by Tahsina Tanvin
      </p>
      <div>
        <p className="mb-2 font-bold text-blue-800 text-lg uppercase tracking-wider">
          Follow me
        </p>
        <div className="flex justify-center space-x-8">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              aria-label={label}
              className="hover:shadow-lg p-3 rounded-full text-blue-800 hover:text-blue-600 hover:scale-110 transition-colors duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
