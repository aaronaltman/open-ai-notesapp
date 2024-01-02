import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note as NoteModel } from "@prisma/client";
import React from "react";

type TheNoteProps = {
  note: NoteModel;
};

export default function TheNote({ note }: TheNoteProps) {
  const wasUpdated = note.updatedAt > note.createdAt;
  const theTime = (wasUpdated ? note.updatedAt : note.createdAt).toDateString();
  return (
    <div className="px-5 py-3 sm:px-2 lg:px-1">
      <Card className="h-[25dvh]">
        <CardHeader>
          <CardTitle>
            <div className="capitalize">{note.title}</div>
          </CardTitle>
          <CardDescription>{theTime}</CardDescription>
          <CardContent>
            <div className="text-lg -ml-[24px]">{note.content}</div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
