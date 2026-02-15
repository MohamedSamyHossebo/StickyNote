"use client";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useAuth";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function LoginForm() {
  const { mutate, isPending, isError, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
        <CardDescription>أدخل بياناتك للوصول إلى حسابك</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error Message */}
          {isError && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-destructive text-sm">
              {(error as any)?.response?.data?.message ||
                "بيانات الدخول غير صحيحة، حاول مرة أخرى."}
            </div>
          )}
        </form>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col gap-3">
        <Button
          type="submit"
          form="login-form"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
