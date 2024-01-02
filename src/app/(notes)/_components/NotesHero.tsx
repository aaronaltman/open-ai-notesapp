"use client";

import React from "react";
import Image from "next/image"; // Adjust if you have a specific logo
import CreateNote from "./CreateNote";
import AddNoteDialog from "./AddNoteDialog";

export default function NotesHero() {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <>
      <section className="w-full h-[50dvh] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex justify-center items-center text-white">
        <div className="pt-10">
          <Image
            src="/logo.png"
            alt="Smart Notes Logo"
            width={100}
            height={100}
            className="mb-4 mx-auto"
          />
          <h2 className="text-3xl font-bold mb-2">Ready to Make a new note?</h2>
          <p className="mb-4">
            Capture your thoughts and ideas with Smart Notes
          </p>
          <button
            onClick={() => {
              setShowDialog(true);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:shadow-lg"
          >
            Add A Note
          </button>
          <AddNoteDialog open={showDialog} setOpen={setShowDialog} />
        </div>
      </section>
    </>
  );
}
