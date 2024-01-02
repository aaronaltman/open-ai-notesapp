import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import SimpleForm from "./SimpleForm";

export default function CreateNote() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-white px-4 py-2 rounded-xl text-slate-900">
          Create a New Note
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Enter Your Form information Below. Title Content and Category
          </DialogTitle>
          <DialogDescription>
            <p>Enter a title and some content for your note.</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
