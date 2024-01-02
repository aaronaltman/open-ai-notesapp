import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";

// POST request to create notes in the database ---------------------------------
export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = createNoteSchema.safeParse(body);
  if (!parseResult.success) {
    return {
      status: 400,
      body: parseResult.error,
    };
  }
  const { title, content } = parseResult.data;
  const { userId } = auth();
  if (!userId) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }
  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });
  return Response.json({ note }, { status: 201 });
}

// PUT Request to change notes in the database ----------------------------------
export async function PUT(req: Request) {
  const body = await req.json();
  const parseResult = updateNoteSchema.safeParse(body);
  if (!parseResult.success) {
    return {
      status: 400,
      body: parseResult.error,
    };
  }
  const { id, title, content } = parseResult.data;
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });
  if (!note) {
    return {
      status: 404,
      body: "Note not found",
    };
  }

  const { userId } = auth();

  if (!userId || note.userId !== userId) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }
  const updatedNote = await prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
  return Response.json({ updatedNote }, { status: 200 });
}

// DELETE Request to delete notes in the database ----------------------------------
export async function DELETE(req: Request) {
  const body = await req.json();
  const parseResult = deleteNoteSchema.safeParse(body);
  if (!parseResult.success) {
    return {
      status: 400,
      body: parseResult.error,
    };
  }
  const { id } = parseResult.data;
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });
  if (!note) {
    return {
      status: 404,
      body: "Note not found",
    };
  }

  const { userId } = auth();

  if (!userId || note.userId !== userId) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }
  const deleteNote = await prisma.note.delete({
    where: {
      id,
    },
  });
  return Response.json(
    { message: "Note Deleted Successfully" },
    { status: 200 }
  );
}
