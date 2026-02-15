import axios from "axios";
import { AuthResponse, RegisterPayload } from "../../models/auth.Model";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    return res.data;
}