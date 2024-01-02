import React from "react";
import Image from "next/image";

export default function PrimaryLoggedOutHeader() {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="max-w-5xl mx-auto">
        <ul className="flex py-10 gap-5">
          <li>
            <p>Logo</p>
          </li>
          <li>
            <a href="/sign-in">Login</a>
          </li>
          <li>
            <a href="/log-in">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
