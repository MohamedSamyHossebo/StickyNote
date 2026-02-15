import { Note } from "@/api/models/notes.Model";
import { updateNote } from "@/api/services/notes/notes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (note: Note) => updateNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("تم تعديل الملاحظة بنجاح ✅");
        },
        onError: (error) => {
            toast.error(`فشل تعديل الملاحظة: ${error.message}`);
        },
    });
};
