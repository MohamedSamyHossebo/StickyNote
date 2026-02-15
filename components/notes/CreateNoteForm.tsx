"use client";

import { useCreateNote } from "@/hooks/useCreateNotes";
import { useState } from "react";

export default function CreateNoteForm() {
  const { mutate, isPending } = useCreateNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تنفيذ الـ Mutation
    mutate(
      { title, content },
      {
        // ممكن نعمل Reset للفورم هنا لما العملية تنجح
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg bg-white p-6 shadow-md border border-gray-100"
    >
      <h3 className="mb-4 text-lg font-bold text-gray-800">
        إضافة ملاحظة جديدة 📝
      </h3>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="عنوان الملاحظة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded border p-2 focus:border-blue-500 focus:outline-none"
        />

        <textarea
          placeholder="اكتب تفاصيل الملاحظة هنا..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="rounded border p-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "جاري الحفظ..." : "حفظ الملاحظة"}
        </button>
      </div>
    </form>
  );
}
