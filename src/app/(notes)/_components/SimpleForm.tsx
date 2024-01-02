import React from "react";

export default function SimpleForm() {
  return (
    <div>
      <section>
        <form className="">
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Content" />
          <input type="text" placeholder="Category" />
          <button type="submit">Add Note</button>
        </form>
      </section>
    </div>
  );
}
