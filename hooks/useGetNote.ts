import { Note } from "@/api/models/notes.Model";
import { getNoteById } from "@/api/services/notes/notes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetNote = (_id: string) => {
    return useQuery<Note>({
        queryKey: ["notes", _id],
        queryFn: () => getNoteById(_id),
        enabled: !!_id,
    });
};