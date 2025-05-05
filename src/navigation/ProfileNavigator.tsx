import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Stack = createNativeStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="ProfileNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
