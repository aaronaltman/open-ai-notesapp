import React from "react";
import Image from "next/image"; // Adjust if you have a specific logo
import CreateNote from "./CreateNote";

export default function NotesHero() {
  return (
    <section className="w-full h-[50dvh] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex justify-center items-center text-white">
      <div className="pt-10">
        <Image
          src="/logo.png"
          alt="Smart Notes Logo"
          width={100}
          height={100}
          className="mb-4 mx-auto"
        />
        <h2 className="text-3xl font-bold mb-2">Ready to take a new note?</h2>
        <p className="mb-4">Capture your thoughts and ideas with Smart Notes</p>
        <CreateNote />
      </div>
    </section>
  );
}
