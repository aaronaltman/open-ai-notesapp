import { create } from "domain";
import * as z from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
