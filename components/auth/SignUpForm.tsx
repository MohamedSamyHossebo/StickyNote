"use client";
import { useState } from "react";
import { useRegister } from "@/hooks/useAuth";
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

function SignUpForm() {
  const { mutate, isPending, isError, error } = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 20,
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
        <CardDescription>
          أدخل بياناتك لإنشاء حساب جديد والبدء في استخدام التطبيق
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="أدخل اسمك الكامل"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          {/* Age & Phone - side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">العمر</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={10}
                max={120}
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {isError && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-destructive text-sm">
              {(error as any)?.response?.data?.message ||
                "حدث خطأ أثناء التسجيل، حاول مرة أخرى."}
            </div>
          )}
        </form>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col gap-3">
        <Button
          type="submit"
          form="signup-form"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          {isPending ? "جاري التسجيل..." : "إنشاء حساب"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
