import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"; // Adjust the import path as needed
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for note form using Zod
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
});

const NoteForm = () => {
  // Initialize the form
  const form = useForm({ mode: "onChange", resolver: zodResolver(schema) });

  return (
    <Form form={form} onSubmit={form.handleSubmit((data) => console.log(data))}>
      {/* Title Field */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <input placeholder="Note Title" {...field} />
            </FormControl>
            <FormDescription>Enter the title for your note.</FormDescription>
            <FormMessage>{field.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Description Field */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <input placeholder="Short description" {...field} />
            </FormControl>
            <FormDescription>
              Enter a short description for your note.
            </FormDescription>
            <FormMessage>{field.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Content Field */}
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <textarea rows="4" placeholder="Note content" {...field} />
            </FormControl>
            <FormDescription>
              Enter the main content of your note.
            </FormDescription>
            <FormMessage>{field.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </Form>
  );
};

export default NoteForm;
