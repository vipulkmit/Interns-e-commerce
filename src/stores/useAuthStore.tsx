import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  setToken: (newtoken: string | null) => void;
  setUser: (user: { name: string; email: string }) => void;
  clearUser: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      token: null,
      isLoggedIn: false,

      setUser: (user: { name: string; email: string }) =>
        set({ name: user.name, email: user.email }),

      setToken: (newtoken) => set({ token: newtoken }),

      login: () => set({ isLoggedIn: true }),

      logout: () => set({ isLoggedIn: false }),

      clearUser: () => set({ name: "", email: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default useAuthStore;

// type AuthStore = {
//   email: string;
//   setUser: (user: { [key: string]: any }) => void;
//   clearUser: () => void;
// };
// const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       email: '',
//       setUser: (user) => set({ email: user.email }),
//       clearUser: () => set({ email: '' }),
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );
// export default useAuthStore;
// const setUser = useAuthStore((state) => state.setUser);
