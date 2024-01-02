"use client";

import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

type AddEditNoteDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  NoteToEdit: Note;
};

export default function AddEditNoteDialog({
  open,
  setOpen,
  NoteToEdit,
}: AddEditNoteDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: NoteToEdit?.title || "",
      content: NoteToEdit?.content || "",
    },
  });

  async function onSubmit(input: CreateNoteSchema) {
    if (NoteToEdit) {
      const response = await fetch("/api/notes/", {
        method: "PUT",
        body: JSON.stringify({
          id: NoteToEdit.id,
          ...input,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } else {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
    form.reset();
    router.refresh();
    setOpen(false);
  }

  async function onDelete() {
    if (!NoteToEdit) return;
    setDeleteInProgress(true);
    const response = await fetch("/api/notes/", {
      method: "DELETE",
      body: JSON.stringify({
        id: NoteToEdit.id,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.refresh();
    setOpen(false);
    setDeleteInProgress(false);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{NoteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note Content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {NoteToEdit && (
                  <LoadingButton
                    type="button"
                    loading={deleteInProgress}
                    onClick={onDelete}
                    variant={"destructive"}
                    disabled={form.formState.isSubmitting}
                  >
                    Delete Note
                  </LoadingButton>
                )}
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                  disabled={deleteInProgress}
                >
                  Submit Note
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
