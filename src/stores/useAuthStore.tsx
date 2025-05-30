import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  user: any | null;
  setToken: (newtoken: string | null) => void;
  setUser: (user: any) => void;
  clearUser: () => void;
  hashydrated: boolean;
  sethydrated: (hashydrated: boolean) => void;
  wishlistItems?: any[];
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      user: null,
      token: null,
      isLoggedIn: false,
      hashydrated: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setUser: (user) => set({ user }),
      setToken: (newtoken) => set({ token: newtoken }),
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          wishlistItems: [],
        }),
      clearUser: () => set({ user: null }),
      sethydrated: (hashydrated) => set({ hashydrated }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.sethydrated(true);
      },
    }
  )
);

export default useAuthStore;
