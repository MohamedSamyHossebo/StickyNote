import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-7xl font-extrabold tracking-tighter text-primary">
          404
        </h1>
        <p className="text-lg font-medium text-foreground">الصفحة غير موجودة</p>
        <p className="text-sm text-muted-foreground">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
      </div>

      <Button asChild>
        <Link href="/home">
          <HomeIcon data-icon="inline-start" />
          العودة للرئيسية
        </Link>
      </Button>
    </div>
  );
}
