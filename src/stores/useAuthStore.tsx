import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
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
  cart: any;
  setCart: (cart: any) => void;
};

const useAuthStore = create<AuthStore>()(

  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      hashydrated: false,
      cart: null,

      setUser: (user) => set({ user }),
      setToken: (newtoken) => set({ token: newtoken }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, token: null }),
      clearUser: () => set({ user: null }),
      sethydrated: (hashydrated) => set({ hashydrated }),
      setCart: (cart)=> set({cart})
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
