"use client";
import useNotes from "@/hooks/notes/useNotes";

function NoteCard() {
  const { data, isLoading, error } = useNotes();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.map((note: any) => (
        <div key={note.id}>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteCard;
