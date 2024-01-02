import React from "react";
import NotesHeader from "../_components/NotesHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <NotesHeader />
      </div>
      <main>{children}</main>
    </div>
  );
}
