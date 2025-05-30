import useAuthStore from "../stores/useAuthStore";
import { DarkColors, LightColors } from "./Colors";

export const useAppTheme = () => {
  const theme = useAuthStore((state) => state.theme);
  return theme === "dark" ? DarkColors : LightColors;
};
