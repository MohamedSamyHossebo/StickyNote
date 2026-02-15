import axios from "axios";
import { AuthResponse, RegisterPayload } from "../../models/auth.Model";

export const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
    const res = await axios.post("/api/auth/signup", userData);
    return res.data;
}