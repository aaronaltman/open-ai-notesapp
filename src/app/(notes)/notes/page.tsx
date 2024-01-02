import { auth, currentUser } from "@clerk/nextjs";
import NotesHero from "../_components/NotesHero";
import DisplayNotes from "../_components/DisplayNotes";
import prisma from "@/lib/db/prisma";
import TheNote from "../_components/TheNote";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (!userId) throw Error("Not logged in");

  // Get all notes for the user
  const allNotes = await prisma.note.findMany({
    where: { userId },
  });

  // Get the User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements

  return (
    <div>
      <NotesHero />
      <div className="grid grid-cols-3 gap-5 max-w-4xl mx-auto">
        {allNotes.map((note) => (
          <TheNote note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}
