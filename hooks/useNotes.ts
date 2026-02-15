import { Note } from "@/api/models/notes.Model";
import { getUserNotes } from "@/api/services/notes/notes.service";
import { useQuery } from "@tanstack/react-query";

export default function useNotes() {
    return useQuery<Note[]>({
        queryKey: ["notes"],
        queryFn: getUserNotes,
    });
}
