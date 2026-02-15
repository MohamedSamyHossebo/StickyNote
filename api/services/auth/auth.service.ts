import { AuthResponse, LoginPayload, LoginResponse, RegisterPayload } from "../../models/auth.Model";
import axiosInstance from "@/lib/axios";

export const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
    const res = await axiosInstance.post("/api/auth/signup", userData);
    return res.data;
}

export const login = async (userData: LoginPayload): Promise<LoginResponse> => {
    const res = await axiosInstance.post("/api/auth/login", userData);
    return res.data;
}

