import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/services/auth/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse, LoginPayload, LoginResponse, RegisterPayload } from "@/api/models/auth.Model";
import { toast } from "react-toastify";

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: RegisterPayload) => register(userData),

        onSuccess: (data: AuthResponse) => {
            toast.success("تم التسجيل بنجاح ✅");
            Cookies.set("token", data.token, { expires: 7 });
            router.push("/home");
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message || "فشل التسجيل ❌");
        },
    });
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: LoginPayload) => login(userData),

        onSuccess: (data: LoginResponse) => {
            toast.success("تم تسجيل الدخول بنجاح ✅");
            Cookies.set("token", data.token, { expires: 7 });
            router.push("/home");
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message || "فشل تسجيل الدخول ❌");
        },
    });
};