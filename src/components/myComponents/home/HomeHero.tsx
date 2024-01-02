import React from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleTheme from "../global/ToggleTheme";

export default function HomeHero() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center text-white p-4">
      <div className="text-center">
        <Image
          src={"/logo.png"}
          alt="Smart Notes Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-6xl font-bold mb-6">Welcome to Smart Notes</h1>
        <p className="text-xl mb-8">
          The future of note-taking is here. Enhance your productivity with
          AI-driven insights.
        </p>
        <div>
          <Link
            href="/notes"
            className="bg-white text-indigo-500 font-bold py-2 px-6 rounded-full mr-4 hover:bg-indigo-100 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
