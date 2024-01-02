import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import { notesIndex } from "@/lib/db/pinecone";
import { getEmbeddingForNote } from "@/lib/utils";

// POST request to create notes in the database and PINECONE ---------------------------------
export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: parseResult.error }), {
        status: 400,
      });
    }

    const { title, content } = parseResult.data;
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const embedding = await getEmbeddingForNote(title, content);

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          userId,
        },
      });
      await notesIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: { userId },
        },
      ]);
      return note;
    });

    return new Response(JSON.stringify({ note }), { status: 201 });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// PUT Request to change notes in the database and PINECONE ----------------------------------
export async function PUT(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: parseResult.error }), {
        status: 400,
      });
    }

    const { id, title, content } = parseResult.data;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return new Response(JSON.stringify({ error: "Note not found" }), {
        status: 404,
      });
    }

    const { userId } = auth();
    if (!userId || note.userId !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const embedding = await getEmbeddingForNote(title, content);
    const updatedNote = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: { id },
        data: { title, content },
      });
      await notesIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: { userId },
        },
      ]);
      return updatedNote;
    });

    return new Response(JSON.stringify({ updatedNote }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// DELETE Request to delete notes in the database and PINECONE ----------------------------------
export async function DELETE(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: parseResult.error }), {
        status: 400,
      });
    }

    const { id } = parseResult.data;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return new Response(JSON.stringify({ error: "Note not found" }), {
        status: 404,
      });
    }

    const { userId } = auth();
    if (!userId || note.userId !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.note.delete({ where: { id } });
      await notesIndex.deleteOne(id);
    });

    return new Response(
      JSON.stringify({ message: "Note Deleted Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// PINECONE Requests to database ----------------------------------
