"use client";

import { useGetNote } from "@/hooks/notes/useGetNote";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: note, isLoading, error } = useGetNote(id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="text-center text-muted-foreground">جاري التحميل...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="text-center text-destructive">خطأ: {error.message}</div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="text-center text-muted-foreground">
          الملاحظة غير موجودة
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowRightIcon data-icon="inline-start" />
        رجوع
      </Button>

      <article className="space-y-6 rounded-lg border border-border p-6">
        <header className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight">
            {note.title ?? "بدون عنوان"}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {note.createdAt && (
              <span>
                تاريخ الإنشاء:{" "}
                {new Date(note.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {note.updatedAt && (
              <span>
                آخر تعديل:{" "}
                {new Date(note.updatedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        <div className="border-t border-border pt-4">
          <p className="whitespace-pre-wrap leading-relaxed">
            {note.content ?? "لا يوجد محتوى"}
          </p>
        </div>
      </article>
    </main>
  );
}
