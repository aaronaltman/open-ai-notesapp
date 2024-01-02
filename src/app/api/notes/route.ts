import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";

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
