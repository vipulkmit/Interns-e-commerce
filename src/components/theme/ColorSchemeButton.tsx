import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { useColorScheme } from "./ColorSchemeContext";

// import { useColorScheme, useTheme } from "../../components";

export const ColorSchemeButton = () => {
  const theme = useTheme();
  const { toggle, colorScheme, active } = useColorScheme();
  console.log(toggle,'toggle',colorScheme,'colorScheme',active,'active');
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });
  return (
    <GestureDetector gesture={tap}>
      <Feather
        name={colorScheme === "light" ? "moon" : "sun"}
        color={theme.colors.border}
        size={32}
      />
    </GestureDetector>
  );
};
