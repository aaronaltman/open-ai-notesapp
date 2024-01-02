import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Placeholder data - replace this with your actual notes data
const notes = [
  {
    title: "Note 1",
    description: "This is note 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    footer: "Created on 1st Jan",
  },
  {
    title: "Note 2",
    description: "This is note 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    footer: "Created on 2nd Jan",
  },
  {
    title: "Note 3",
    description: "This is note 3",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    footer: "Created on 2nd Jan",
  },
  {
    title: "Note 4",
    description: "This is note 4",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    footer: "Created on 2nd Jan",
  },
  // Add more notes...
];

const DisplayNotes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>{note.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{note.content}</p>
          </CardContent>
          <CardFooter>
            <p>{note.footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DisplayNotes;
