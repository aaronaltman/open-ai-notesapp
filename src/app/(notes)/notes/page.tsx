import { auth, currentUser } from "@clerk/nextjs";
import NotesHero from "../_components/NotesHero";
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
      <h2 className="text-center py-5 text-3xl">{user?.firstName}s notes</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto min-h-[50dvh]">
        {allNotes.map((note) => (
          <TheNote note={note} key={note.id} />
        ))}
        {allNotes.length === 0 && (
          <div className="text-center text-gray-500">
            <p>You dont have any notes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
