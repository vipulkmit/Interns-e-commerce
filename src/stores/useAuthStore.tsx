import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  isLoggedIn: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  setToken: (newtoken: string | null) => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      setToken: (newtoken) => set({ token: newtoken }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
