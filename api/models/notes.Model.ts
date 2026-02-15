export interface Note {
    title?: string,
    content?: string
}

export interface Response {
    content: string;
    message: string;
    note: Note;
    status: string;
    title?: string;
}

export interface Note {
    __v: number;
    _id: string;
    content?: string;
    createdAt?: string;
    title?: string;
    updatedAt?: string;
    userId?: string;
}
export interface CreateNotePayload {
    title: string;
    content: string;
}
