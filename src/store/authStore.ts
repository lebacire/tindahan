import { create } from "zustand";
import {
    getStorage,
    removeStorage,
    setStorage
} from "../services/storage";

type User = {
    email: string;
};

type AuthState = {
    user: User | null;
    hydrated:boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    hydrated: false,
    login: async (email) => {
        const user = {
            email
        };
        await setStorage("user", JSON.stringify(user));
        set({
            user
        });
    },

    logout: async () => {
        await removeStorage(
            "user"
        );
        set({
            user: null
        });
    },

    loadUser: async () => {
        const storedUser =
            await getStorage(
            "user"
        );
        if (storedUser) {
            set({
                user: JSON.parse(storedUser),
                hydrated:true
            });
        }
        else{
            set({
                hydrated:true
            });
        }
    }
}));