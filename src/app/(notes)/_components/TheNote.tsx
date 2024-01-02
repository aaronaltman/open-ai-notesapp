import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Note as NoteModel } from "@prisma/client";
import React from "react";

type TheNoteProps = {
  note: NoteModel;
};

export default function TheNote({ note }: TheNoteProps) {
  const wasUpdated = note.updatedAt > note.createdAt;
  const theTime = (wasUpdated ? note.updatedAt : note.createdAt).toDateString();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
