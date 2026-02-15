"use client";

import { useCreateNote } from "@/hooks/notes/useCreateNotes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SendIcon } from "lucide-react";

export default function CreateNoteForm() {
  const { mutate, isPending } = useCreateNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { title, content },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      },
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>إضافة ملاحظة جديدة 📝</CardTitle>
        <CardDescription>
          أدخل عنوان ومحتوى الملاحظة ثم اضغط حفظ.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <Button type="submit" disabled={isPending} className="self-end">
            <SendIcon data-icon="inline-start" />
            {isPending ? "جاري الحفظ..." : "حفظ الملاحظة"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
