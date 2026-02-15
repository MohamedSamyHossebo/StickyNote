import { deleteNote } from "@/api/services/notes/notes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (_id: string) => deleteNote(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("تم حذف الملاحظة بنجاح 🗑️");
        },
        onError: (error) => {
            toast.error(`فشل حذف الملاحظة: ${error.message}`);
        },
    });
};
