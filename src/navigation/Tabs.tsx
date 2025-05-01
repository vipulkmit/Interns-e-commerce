import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { assets } from "../../assets/images";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import WishlistNavigator from "./WishlistNavigator";
import CartNavigator from "./CartNavigator";
import ProfileNavigator from "./ProfileNavigator";

export default function RootComponent() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      /* @ts-ignore: Suppress TypeScript error for 'id' */
      id="mainTabNavigator"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let iconName: ImageSourcePropType;

            if (route.name === "HomeNavigator") {
              iconName = focused ? assets.HomeBlue : assets.Home;
            } else if (route.name === "SearchNavigator") {
              iconName = focused ? assets.SearchBlue : assets.Search;
            } else if (route.name === "WishlistNavigator") {
              iconName = focused ? assets.HeartBlue : assets.Heart;
            } else if (route.name === "CartNavigator") {
              iconName = focused ? assets.BagBlue : assets.Bag;
            } else if (route.name === "ProfileNavigator") {
              iconName = focused ? assets.UserBlue : assets.User;
            }
            return (
              <Image
                source={iconName}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            );
          },
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            flex: 1,
          },
        };
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WishlistNavigator"
        component={WishlistNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
  },
});
