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

  wishlistItems: string[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      hashydrated: false,
      wishlistItems: [],

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

      isInWishlist: (productId: string) => {
        const state = get();
        return state.wishlistItems.includes(productId);
      },

      addToWishlist: (productId: string) => {
        set((state) => {
          if (!state.wishlistItems.includes(productId)) {
            return {
              wishlistItems: [...state.wishlistItems, productId],
            };
          }
          return state;
        });
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((id) => id !== productId),
        }));
      },

      toggleWishlist: (productId: string) => {
        const state = get();
        if (state.isInWishlist(productId)) {
          state.removeFromWishlist(productId);
        } else {
          state.addToWishlist(productId);
        }
      },

      clearWishlist: () => set({ wishlistItems: [] }),
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
