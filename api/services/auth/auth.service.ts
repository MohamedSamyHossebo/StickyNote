import axios from "axios";
import { AuthResponse, LoginPayload, LoginResponse, RegisterPayload } from "../../models/auth.Model";

export const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
    const res = await axios.post("/api/auth/signup", userData);
    return res.data;
}

export const login = async (userData: LoginPayload): Promise<LoginResponse> => {
    const res = await axios.post("/api/auth/login", userData);
    return res.data;
}
