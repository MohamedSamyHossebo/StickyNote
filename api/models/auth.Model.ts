export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    age: number;
    phone: string;
}
export interface AuthResponse {
    message: string;
    status: string;
    token: string;
}