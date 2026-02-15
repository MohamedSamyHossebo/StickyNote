import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("token");
    queryClient.clear();
    toast.success("تم تسجيل الخروج بنجاح 👋");
    router.replace("/login");
  };

  return logout;
};