import { CreateNotePayload } from "@/api/models/notes.Model";
import { createNote } from "@/api/services/notes/notes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newNote: CreateNotePayload) => createNote(newNote),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("تمت إضافة الملاحظة بنجاح ✅");
        },

        onError: (error) => {
            toast.error(`فشل إضافة الملاحظة: ${error.message}`);
        },
    });
};