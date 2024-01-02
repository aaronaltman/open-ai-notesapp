"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note as NoteModel } from "@prisma/client";
import React, { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

type TheNoteProps = {
  note: NoteModel;
};

export default function TheNote({ note }: TheNoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;
  const theTime = (wasUpdated ? note.updatedAt : note.createdAt).toDateString();
  return (
    <>
      <Card
        onClick={() => setShowEditDialog(true)}
        className="h-[25dvh] cursor-pointer transition-shadow hover:shadow-lg"
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>{theTime}</CardDescription>
          <CardContent className="-ml-[24px]">{note.content}</CardContent>
        </CardHeader>
      </Card>
      <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        NoteToEdit={note}
      />
    </>
  );
}
