import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { assets } from "../../assets/images";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import WishlistNavigator from "./WishlistNavigator";
import ProfileNavigator from "./ProfileNavigator";
import CartNavigator from "./CartNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ProfileScreen";
  const hideOnScreens = [
    "MyOrdersScreen",
    "EditProfile",
    "ChangePasswordScreen",
    "Passwordchange",
    "PrivacyPolicy",
    "TermsnConditions",
    "AboutSection",
    "HelpScreen",
    "DeliveryAddress",
    "AddAddressList",
    "PromoCodeScreen",
  ];
  return hideOnScreens.includes(routeName);
}

function getTabBarVisibilityForHome(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
  const hideOnScreens = ["ProductDetailPage", "ProductsPage", "Category"];
  return hideOnScreens.includes(routeName);
}

function getTabBarVisibilityForSearch(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "SearchScreen";
  const hideOnScreens = ["ProductDetailPage", "ProductsPage"];
  return hideOnScreens.includes(routeName);
}
function getTabBarVisibilityForCart(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "CartScreen";
  const hideOnScreens = [
    "OrderScreen",
    "PromoCodeScreen",
    "DeliveryAddress",
    "AddAddressList",
  ];
  return hideOnScreens.includes(routeName);
}
export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="bottomTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName: ImageSourcePropType =
            route.name === "HomeNavigator"
              ? focused
                ? assets.HomeBlue
                : assets.Home
              : route.name === "SearchNavigator"
              ? focused
                ? assets.SearchBlue
                : assets.Search
              : route.name === "WishlistNavigator"
              ? focused
                ? assets.HeartBlue
                : assets.Heart
              : route.name === "CartNavigator"
              ? focused
                ? assets.BagBlue
                : assets.Bag
              : route.name === "ProfileNavigator"
              ? focused
                ? assets.UserBlue
                : assets.User
              : assets.Home;

          return (
            <Image
              source={iconName}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
          );
        },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIconStyle: {},
      })}
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ route }) => {
          const hideTabBar = getTabBarVisibilityForHome(route);
          return {
            headerShown: false,
            tabBarStyle: hideTabBar ? { display: "none" } : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={({ route }) => {
          const hideTabBar = getTabBarVisibilityForSearch(route);
          return {
            headerShown: false,
            tabBarStyle: hideTabBar ? { display: "none" } : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name="WishlistNavigator"
        component={WishlistNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={({ route }) => {
          const hideTabBar = getTabBarVisibilityForCart(route);
          return {
            headerShown: false,
            tabBarStyle: hideTabBar ? { display: "none" } : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={({ route }) => {
          const hideTabBar = getTabBarVisibility(route);
          return {
            headerShown: false,
            tabBarStyle: hideTabBar ? { display: "none" } : styles.tabBar,
          };
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
  },
});
