import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { StatusBar, useColorScheme } from "react-native";
import { Typography } from "./src/theme/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ColorSchemeProvider } from "./src/components/theme/ColorSchemeContext";
import { ThemeProvider } from "@shopify/restyle";
import { darkTheme, theme } from "./src/components/theme/Theme";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorSchemeProvider>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : theme}>

    <NavigationContainer>
      <RootNavigator />
      
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Typography.Colors.white}
      />
    </NavigationContainer>
    </ThemeProvider>
    </ColorSchemeProvider>
    // </GestureHandlerRootView>
  );
}
