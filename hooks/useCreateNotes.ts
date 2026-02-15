import { CreateNotePayload } from "@/api/models/notes.Model";
import { createNote } from "@/api/services/notes/notes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newNote: CreateNotePayload) => createNote(newNote),

        // ✅ هنا السحر كله!
        onSuccess: () => {
            // 1. أول ما الإضافة تنجح، بنقوله يمسح كاش 'notes' ويجيبه تاني
            queryClient.invalidateQueries({ queryKey: ["notes"] });

            // ممكن تطبع رسالة نجاح هنا
            console.log("Note added successfully!");
        },

        onError: (error) => {
            console.error("Failed to add note:", error);
        },
    });
}