import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1. مسح التوكن من المتصفح
    Cookies.remove("token");

    // 2. مسح كل البيانات المتخزنة في TanStack Query
    // دي خطوة مهمة جداً عشان الأمان
    queryClient.clear(); 
    // أو ممكن تستخدم queryClient.removeQueries() لو عايز تحدد حاجات معينة

    // 3. التوجيه لصفحة تسجيل الدخول
    // استخدمنا replace عشان اليوزر ميعرفش يعمل Back ويرجع للصفحة تاني
    router.replace("/login");
  };

  return logout;
};