"use client";

import { useState } from "react";
import { useCreateNote } from "@/hooks/notes/useCreateNotes";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export default function AddNoteDialog() {
  const { mutate, isPending } = useCreateNote();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { title, content },
      {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon data-icon="inline-start" />
          إضافة ملاحظة
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>إضافة ملاحظة جديدة 📝</DialogTitle>
            <DialogDescription>
              أدخل عنوان ومحتوى الملاحظة ثم اضغط حفظ.
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
              placeholder="اكتب تفاصيل الملاحظة هنا..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "جاري الحفظ..." : "حفظ الملاحظة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
