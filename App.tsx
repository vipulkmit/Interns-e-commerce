import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { StatusBar } from "react-native";
import { Typography } from "./src/theme/Colors";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Typography.Colors.white}
      />
    </NavigationContainer>
  );
}
