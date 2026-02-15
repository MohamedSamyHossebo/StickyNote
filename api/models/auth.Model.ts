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
export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    message: string;
    status: string;
    token: string;
    user: User;
}
export interface User {
    email: string;
    id: string;
    name: string;
}

