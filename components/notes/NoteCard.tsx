"use client";

import useNotes from "@/hooks/notes/useNotes";
import { Note } from "@/api/models/notes.Model";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, FileTextIcon } from "lucide-react";

function NoteCard() {
  const { data, isLoading, error } = useNotes();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-6 text-center text-sm text-destructive">
          خطأ: {error.message}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <FileTextIcon className="size-10 opacity-40" />
          <p className="text-sm">لا توجد ملاحظات بعد</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((note: Note) => (
        <Card
          key={note._id}
          className="group transition-shadow hover:shadow-md"
        >
          <CardHeader>
            <CardTitle className="line-clamp-1 text-sm">
              {note.title ?? "بدون عنوان"}
            </CardTitle>
            {note.createdAt && (
              <CardDescription className="flex items-center gap-1">
                <CalendarIcon className="size-3" />
                {new Date(note.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {note.content ?? "لا يوجد محتوى"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default NoteCard;
