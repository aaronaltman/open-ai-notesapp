import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { notes } from "@/constants/notes";

const DisplayNotes = () => {
  return (
    <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default DisplayNotes;
