import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type AuthStore = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({   
            isLoggedIn: false,
            login:() =>  set({ isLoggedIn: true }),
            logout:() => set({ isLoggedIn: false })        
          }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuthStore;