import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
// import ChangePasswordScreen from "../screens/Profile/ChangePasswordScreen";
import PasswordchangeScreen from "../authentication/PasswordchangeScreen";
import PrivacyPolicyScreen from "../screens/Profile/PrivacyPolicyScreen";
import TermsnConditionScreen from "../screens/Profile/Terms&ConditionScreen";
import AboutScreen from "../screens/Profile/AboutScreen";
import HelpScreen from "../screens/Profile/HelpScreen";

const Stack = createNativeStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="ProfileNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      {/* <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} /> */}
      <Stack.Screen name="Passwordchange" component={PasswordchangeScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsnConditions" component={TermsnConditionScreen} />
      <Stack.Screen name="AboutSection" component={AboutScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
