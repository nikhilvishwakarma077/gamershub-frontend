import { create } from "zustand";

type User = {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean; 
    avatarUrl : string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;

    setUser: (user: User) => void;
    logout: () => void;
    setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    setUser: (user) => {
        set({
            user,
            isAuthenticated: true,
            loading: false,
        });
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            loading: false,
        });
    },

    setLoading: (value) => {
        set({
            loading: value,
        });
    },
}));