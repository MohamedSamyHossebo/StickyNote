"use client";

import { useState } from "react";
import { Note } from "@/api/models/notes.Model";
import { useUpdateNote } from "@/hooks/useUpdateNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditNoteDialogProps {
  note: Note;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditNoteDialog({
  note,
  open,
  onOpenChange,
}: EditNoteDialogProps) {
  const { mutate, isPending } = useUpdateNote();
  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { ...note, title, content },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>تعديل الملاحظة ✏️</DialogTitle>
            <DialogDescription>
              عدّل العنوان أو المحتوى ثم اضغط حفظ.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <Input
              placeholder="عنوان الملاحظة"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="محتوى الملاحظة..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
