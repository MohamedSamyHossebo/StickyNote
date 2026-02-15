import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <LoaderCircleIcon className="size-10 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">جاري التحميل...</p>
    </div>
  );
}
