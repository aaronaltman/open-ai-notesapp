import { auth, currentUser } from "@clerk/nextjs";
import NotesHeader from "../_components/NotesHeader";
import NotesHero from "../_components/NotesHero";
import CreateNote from "../_components/CreateNote";
import DisplayNotes from "../_components/DisplayNotes";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
  }

  // Get the User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements

  return (
    <div>
      <NotesHero />
      <DisplayNotes />
    </div>
  );
}
