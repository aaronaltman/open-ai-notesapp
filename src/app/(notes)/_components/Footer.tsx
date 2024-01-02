import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-20 bg-gray-800 text-white flex justify-center items-center">
      <p>© {new Date().getFullYear()} Smart Notes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
