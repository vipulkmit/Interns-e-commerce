import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthActions {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
const useAuthStore = create<AuthActions>()(
    persist(
    (set) => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}),
{
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),
}
))

export default useAuthStore;

