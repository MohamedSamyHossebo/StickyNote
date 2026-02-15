import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/services/auth/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse, RegisterPayload } from "@/api/models/auth.Model";

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        // دالة الاتصال اللي عملناها فوق
        mutationFn: (userData: RegisterPayload) => register(userData),

        // لو العملية نجحت (Succeeded)
        onSuccess: (data: AuthResponse) => {
            console.log("تم التسجيل بنجاح:", data.message);

            // 1. تخزين التوكن في الكوكيز
            Cookies.set("token", data.token, { expires: 7 }); // التوكن هيقعد 7 أيام

            // 2. توجيه المستخدم لصفحة الملاحظات
            router.push("/home");
        },

        // لو حصل خطأ (Failed)
        onError: (error: any) => {
            console.error("فشل التسجيل:", error.response?.data?.message || error.message);
            // ممكن تعرض Toast notification هنا
        },
    });
};