
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   Image,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import { assets } from "../../assets/images";
// import HomeNavigator from "./HomeNavigator";
// import SearchNavigator from "./SearchNavigator";
// import WishlistNavigator from "./WishlistNavigator";
// import ProfileNavigator from "./ProfileNavigator";
// import CartNavigator from "./CartNavigator";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// import useAuthStore from "../stores/useAuthStore";
// import { Typography } from "../theme/Colors";

// function getTabBarVisibility(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "ProfileScreen";
//   const hideOnScreens = [
//     "MyOrdersScreen",
//     "EditProfile",
//     "ChangePasswordScreen",
//     "Passwordchange",
//     "PrivacyPolicy",
//     "TermsnConditions",
//     "AboutSection",
//     "HelpScreen",
//     "DeliveryAddress",
//     "AddAddressList",
//     "PromoCodeScreen",
//   ];
//   return hideOnScreens.includes(routeName);
// }

// function getTabBarVisibilityForHome(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
//   const hideOnScreens = ["ProductDetailPage", "ProductsPage", "Category"];
//   return hideOnScreens.includes(routeName);
// }

// function getTabBarVisibilityForSearch(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "SearchScreen";
//   const hideOnScreens = ["ProductDetailPage", "ProductsPage"];
//   return hideOnScreens.includes(routeName);
// }

// function getTabBarVisibilityForCart(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "CartScreen";
//   const hideOnScreens = [
//     "OrderScreen",
//     "PromoCodeScreen",
//     "DeliveryAddress",
//     "AddAddressList",
//   ];
//   return hideOnScreens.includes(routeName);
// }

// function CustomTabBar({ state, descriptors, navigation }) {
//   const themeMode = useAuthStore((state) => state.theme);
//   const theme =
//     themeMode === "dark"
//       ? {
//           background: Typography.Colors.charcol,
//           text: Typography.Colors.white,
//         }
//       : {
//           background: Typography.Colors.navigatorColor,
//           text: Typography.Colors.black,
//         };

//   const getIconSource = (routeName: string, isFocused: boolean) => {
//     switch (routeName) {
//       case "HomeNavigator":
//         return isFocused ? assets.HomeBlue : assets.Home;
//       case "SearchNavigator":
//         return isFocused ? assets.SearchBlue : assets.Search;
//       case "WishlistNavigator":
//         return isFocused ? assets.HeartBlue : assets.Heart;
//       case "CartNavigator":
//         return isFocused ? assets.BagBlue : assets.Bag;
//       case "ProfileNavigator":
//         return isFocused ? assets.UserBlue : assets.User;
//       default:
//         return assets.Home;
//     }
//   };

//   const getLabel = (routeName: string) => {
//     switch (routeName) {
//       case "HomeNavigator":
//         return "Home";
//       case "SearchNavigator":
//         return "Search";
//       case "WishlistNavigator":
//         return "Wishlist";
//       case "CartNavigator":
//         return "Cart";
//       case "ProfileNavigator":
//         return "Profile";
//       default:
//         return "";
//     }
//   };

//   const handleTabPress = (index, routeName) => {
//     const event = navigation.emit({
//       type: "tabPress",
//       target: state.routes[index].key,
//       canPreventDefault: true,
//     });

//     if (state.index !== index && !event.defaultPrevented) {
//       navigation.navigate(routeName);
//     }
//   };

//   return (
//     <View style={[styles.tabBarContainer, { backgroundColor: theme.background }]}>
//       <View style={styles.tabBar}>
//         {state.routes.map((route, index) => {
//           const isFocused = state.index === index;

//           return (
//             <TouchableOpacity
//               key={route.key}
//               style={styles.tabItem}
//               onPress={() => handleTabPress(index, route.name)}
//               activeOpacity={0.8}
//             >
//               <View
//                 style={[
//                   styles.iconContainer,
//                   isFocused && styles.focusedIconContainer,
//                 ]}
//               >
//                 <Image
//                   source={getIconSource(route.name, isFocused)}
//                   style={[styles.icon,{tintColor:!isFocused?theme.text:null
//                   }]}
//                 />
//               </View>
//               <Text style={[styles.label, { color: theme.text }]}>
//                 {getLabel(route.name)}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// export default function BottomTabs() {
//   const Tab = createBottomTabNavigator();

//   return (
//     <Tab.Navigator
//       id="bottomTab"
//       tabBar={(props) => <CustomTabBar {...props} />}
//       backBehavior="initialRoute"
//     >
//       <Tab.Screen
//         name="HomeNavigator"
//         component={HomeNavigator}
//         options={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: getTabBarVisibilityForHome(route)
//             ? { display: "none" }
//             : undefined,
//         })}
//       />
//       <Tab.Screen
//         name="SearchNavigator"
//         component={SearchNavigator}
//         options={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: getTabBarVisibilityForSearch(route)
//             ? { display: "none" }
//             : undefined,
//         })}
//       />
//       <Tab.Screen
//         name="WishlistNavigator"
//         component={WishlistNavigator}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="CartNavigator"
//         component={CartNavigator}
//         options={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: getTabBarVisibilityForCart(route)
//             ? { display: "none" }
//             : undefined,
//         })}
//       />
//       <Tab.Screen
//         name="ProfileNavigator"
//         component={ProfileNavigator}
//         options={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: getTabBarVisibility(route)
//             ? { display: "none" }
//             : undefined,
//         })}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     right: 10,
//     height: 80,
//     borderRadius: 40,
//     paddingHorizontal: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   tabBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     flex: 1,
//     paddingBottom: 10,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   focusedIconContainer: {
//     backgroundColor: "#fff",
//     elevation:3
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     resizeMode: "contain",
//   },
//   label: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: "500",
//   },
// });



import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { assets } from "../../assets/images";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import WishlistNavigator from "./WishlistNavigator";
import ProfileNavigator from "./ProfileNavigator";
import CartNavigator from "./CartNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import useAuthStore from "../stores/useAuthStore";
import { Typography } from "../theme/Colors";

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

function CustomTabBar({ state, descriptors, navigation }) {
  const themeMode = useAuthStore((state) => state.theme);
  const theme =
    themeMode === "dark"
      ? {
          background: Typography.Colors.charcol,
          text: Typography.Colors.white,
        }
      : {
          background: Typography.Colors.navigatorColor,
          text: Typography.Colors.black,
        };

  // Check if tab bar should be hidden for any route
  const shouldHideTabBar = () => {
    const currentRoute = state.routes[state.index];
    const routeName = currentRoute.name;

    switch (routeName) {
      case "HomeNavigator":
        return getTabBarVisibilityForHome(currentRoute);
      case "SearchNavigator":
        return getTabBarVisibilityForSearch(currentRoute);
      case "CartNavigator":
        return getTabBarVisibilityForCart(currentRoute);
      case "ProfileNavigator":
        return getTabBarVisibility(currentRoute);
      case "WishlistNavigator":
        return false; // Wishlist doesn't have hide logic
      default:
        return false;
    }
  };

  // If tab bar should be hidden, return null
  if (shouldHideTabBar()) {
    return null;
  }

  const getIconSource = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case "HomeNavigator":
        return isFocused ? assets.HomeBlue : assets.Home;
      case "SearchNavigator":
        return isFocused ? assets.SearchBlue : assets.Search;
      case "WishlistNavigator":
        return isFocused ? assets.HeartBlue : assets.Heart;
      case "CartNavigator":
        return isFocused ? assets.BagBlue : assets.Bag;
      case "ProfileNavigator":
        return isFocused ? assets.UserBlue : assets.User;
      default:
        return assets.Home;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case "HomeNavigator":
        return "Home";
      case "SearchNavigator":
        return "Search";
      case "WishlistNavigator":
        return "Wishlist";
      case "CartNavigator":
        return "Cart";
      case "ProfileNavigator":
        return "Profile";
      default:
        return "";
    }
  };

  const handleTabPress = (index, routeName) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: theme.background }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => handleTabPress(index, route.name)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.focusedIconContainer,
                ]}
              >
                <Image
                  source={getIconSource(route.name, isFocused)}
                  style={[styles.icon,{tintColor:!isFocused?theme.text:null
                  }]}
                />
              </View>
              <Text style={[styles.label, { color: theme.text }]}>
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id="bottomTab"
      tabBar={(props) => <CustomTabBar {...props} />}
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          headerShown: false,
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
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 80,
    borderRadius: 40,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedIconContainer: {
    backgroundColor: "#fff",
    elevation:3
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});