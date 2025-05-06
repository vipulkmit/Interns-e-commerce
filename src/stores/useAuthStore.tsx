import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  number: string;
};

type AuthStore = {
  isLoggedIn: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  user: User | null;
  setToken: (newtoken: string | null) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      setUser: (user) => set({ user }),

      setToken: (newtoken) => set({ token: newtoken }),

      login: () => set({ isLoggedIn: true }),

      logout: () => set({ isLoggedIn: false }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default useAuthStore;
