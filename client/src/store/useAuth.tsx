import { create } from "zustand";
import { login, signup } from "../api/api.js";
import { toast } from "react-hot-toast";

type User = {
    id: string;
    email: string;
    name: string;
    role: string;
};

type AuthState = {
    user: User | null;
    token: string | null;
    isSuccess: boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
    login: (data: { email: string; password: string }) => Promise<void>;
    signup: (data: { email: string; password: string; name: string }) => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: null,
    isSuccess: false,

    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    logout: () => set({ user: null, token: null, isSuccess: false }),

    login: async (data) => {
        try {
            const result = await login(data);
            set({ user: result.user, token: result.token, isSuccess: true });
            toast.success("Login successful");
        } catch (error: any) {
            set({ isSuccess: false });
            const msg = error?.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg[0] : msg || "Login failed");
        }
    },

    signup: async (data) => {
        try {
            const result = await signup(data);
            set({ user: result.data, token: result.token, isSuccess: true });
            toast.success("Sign up successful");
        } catch (error: any) {
            set({ isSuccess: false });
            const msg = error?.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg[0] : msg || "Sign up failed");
        }
    },
}));