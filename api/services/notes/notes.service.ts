import { CreateNotePayload, Note } from "@/api/models/notes.Model";
import axiosInstance from "@/lib/axios";

export const getUserNotes = async () => {
    const res = await axiosInstance.get("/api/notes/note-with-user");
    return res.data.notes;
}

export const createNote = async (note: CreateNotePayload) => {
    const res = await axiosInstance.post("/api/notes", note);
    return res.data;
}

export const updateNote = async (note: Note) => {
    const res = await axiosInstance.put(`/api/notes/${note._id}`, note);
    return res.data;
}

export const deleteNote = async (_id: string) => {
    const res = await axiosInstance.delete(`/api/notes/${_id}`);
    return res.data;
}