import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { StatusBar } from "react-native";
import { Typography } from "./src/theme/Colors";
import useAuthStore from "./src/stores/useAuthStore";

export default function App() {
  const theme = useAuthStore((state) => state.theme);
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <StatusBar
      // barStyle="default"
        barStyle={theme === "dark" ?"light-content":"dark-content"}
        backgroundColor={
          theme === "dark" ? Typography.Colors.charcol : "#fef8f8"
        }
        
      />
    </NavigationContainer>
  );
}
