import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/services/auth/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse, LoginPayload, LoginResponse, RegisterPayload } from "@/api/models/auth.Model";

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: RegisterPayload) => register(userData),

        onSuccess: (data: AuthResponse) => {
            console.log("تم التسجيل بنجاح:", data.message);
            Cookies.set("token", data.token, { expires: 7 });
            router.push("/home");
        },

        onError: (error: any) => {
            console.error("فشل التسجيل:", error.response?.data?.message || error.message);
        },
    });
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: LoginPayload) => login(userData),

        onSuccess: (data: LoginResponse) => {
            console.log("تم تسجيل الدخول بنجاح:", data.message);
            Cookies.set("token", data.token, { expires: 7 });
            router.push("/home");
        },

        onError: (error: any) => {
            console.error("فشل تسجيل الدخول:", error.response?.data?.message || error.message);
        },
    });
};