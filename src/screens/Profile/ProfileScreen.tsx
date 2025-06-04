// import {
//   Image,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Typography } from "../../theme/Colors";
// import { assets } from "../../../assets/images";
// import { useNavigation } from "@react-navigation/native";
// import useAuthStore from "../../stores/useAuthStore";
// import { ThemeToggle } from "../../components/Themes/ThemeToggle";

// const ProfileScreen = () => {
//   const user = useAuthStore((state) => state.user);
//   const themeMode = useAuthStore((state) => state.theme);
//   const theme =
//     themeMode === "dark"
//       ? {
//           background: Typography.Colors.black,
//           text: Typography.Colors.white,
//         }
//       : {
//           background: Typography.Colors.white,
//           text: Typography.Colors.black,
//         };
//   const logout = useAuthStore((state) => state.logout);
//   const Navigation = useNavigation();

//   const handleNavigation = (screen, params = {}) => {
//     if (screen) Navigation.navigate(screen, params);
//   };

//   const menuItems = [
//     {
//       title: "My Orders",
//       icon: assets.tote,
//       onPress: () => handleNavigation("MyOrdersScreen"),
//     },
//     {
//       title: "Wishlist",
//       icon: assets.heart,
//       onPress: () =>
//         handleNavigation("WishlistNavigator", { screen: "WishlistScreen" }),
//     },
//     {
//       title: "Delivery Address",
//       icon: assets.Location,
//       iconStyle: styles.logodelivery,
//       onPress: () => handleNavigation("DeliveryAddress"),
//     },
//     {
//       title: "Offers",
//       icon: assets.Offers,
//       onPress: () => handleNavigation("PromoCodeScreen"),
//     },
//     {
//       title: "Help",
//       icon: assets.help,
//       onPress: () => handleNavigation("HelpScreen"),
//     },
//     {
//       title: "About Us",
//       icon: assets.about,
//       onPress: () => handleNavigation("AboutSection"),
//     },
//     {
//       title: "Log Out",
//       icon: assets.Logout,
//       textStyle: styles.textlistlogout,
//       onPress: logout,
//     },
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={item.onPress}>
//       <View style={styles.secondsection}>
//         <View style={styles.logocontainer}>
//           <Image
//             source={item.icon}
//             style={[
//               item.iconStyle || styles.logostyle,
//               {
//                 tintColor:
//                   item.icon === assets.Logout
//                     ? Typography.Colors.red
//                     : theme.text,
//               },
//             ]}
//           />
//           <Text
//             style={[
//               item.textStyle || styles.textlist,
//               {
//                 color:
//                   item.title === "Log Out" ? Typography.Colors.red : theme.text,
//               },
//             ]}
//           >
//             {item.title}
//           </Text>
//         </View>
//         {item.title !== "Log Out" && (
//           <View style={styles.arrowstyleview}>
//             <Image
//               source={assets.rightarrow}
//               style={[styles.arrowstyle, { tintColor: theme.text }]}
//             />
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <TouchableOpacity onPress={() => handleNavigation("EditProfile")}>
//         <View style={styles.firstsection}>
//           <Image
//             source={
//               user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
//             }
//             style={styles.profilepic}
//           />
//           <View style={styles.textcontainer}>
//             <Text style={[styles.textname, { color: theme.text }]}>
//               {user?.name}
//             </Text>
//             <Text style={[styles.mailcontainer, { color: theme.text }]}>
//               {user?.email}
//             </Text>
//           </View>
//           <View style={styles.modeContainer}>
//             <ThemeToggle />
//           </View>
//         </View>
//       </TouchableOpacity>

//       <FlatList
//         data={menuItems}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         scrollEnabled={false}
//         showsVerticalScrollIndicator={true}
//       />

//       <View style={styles.tncstyle}>
//         <TouchableOpacity onPress={() => handleNavigation("PrivacyPolicy")}>
//           <Text style={[styles.policystyle, { color: theme.text }]}>
//             Privacy Policy
//           </Text>
//         </TouchableOpacity>
//         <View style={[styles.line, { backgroundColor: theme.text }]}></View>
//         <TouchableOpacity onPress={() => handleNavigation("TermsnConditions")}>
//           <Text style={[styles.conditionstyle, { color: theme.text }]}>
//             Terms and Conditions
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: Typography.Colors.white,
//     paddingHorizontal: 20,
//     flex: 1,
//   },
//   modeContainer: {
//     flexDirection: "row",
//     gap: 20,
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems:'center'

//   },
//   firstsection: {
//     paddingVertical: 35,
//     flexDirection: "row",
//   },
//   secondsection: {
//     paddingHorizontal: 14,
//     paddingVertical: 17,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   textcontainer: {
//     marginLeft: 5,
//     marginTop: 2,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   profilepic: {
//     borderRadius: 50,
//     height: 62,
//     width: 62,
//   },
//   textname: {
//     fontSize: 18,
//     fontFamily: Typography.font.bold,
//     fontWeight: "500",
//     textTransform: "capitalize",
//   },
//   mailcontainer: {
//     fontSize: 14,
//     fontFamily: Typography.font.regular,
//   },
//   iconStyle: {
//     color: Typography.Colors.white,
//   },
//   logostyle: {
//     tintColor: Typography.Colors.white,
//     marginTop: 5,
//     height: 20,
//     width: 20,
//   },
//   logodelivery: {
//     marginTop: 5,
//     height: 25,
//     width: 21.5,
//   },
//   logocontainer: {
//     flexDirection: "row",
//     gap: 20,
//   },
//   textlist: {
//     alignSelf: "center",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: Typography.font.medium,
//   },
//   textlistlogout: {
//     alignSelf: "center",
//     fontSize: 16,
//     fontWeight: "600",
//     fontFamily: Typography.font.medium,
//   },
//   arrowstyle: {
//     paddingVertical: 8.5,
//     height: 14,
//     width: 10,
//     alignSelf: "center",
//   },
//   arrowstyleview: {
//     alignSelf: "center",
//     paddingVertical: 8,
//   },
//   tncstyle: {
//     gap: 5,
//     flexDirection: "row",
//     alignSelf: "center",
//     paddingVertical: 20,
//   },
//   line: {
//     gap: 5,
//     height: 15,
//     alignSelf: "center",
//     borderWidth: 0.2,
//     opacity: 0.5,
//     color: Typography.Colors.lightgrey,
//   },
//   policystyle: {
//     paddingVertical: 1.5,
//   },
//   conditionstyle: {
//     paddingVertical: 1.5,
//   },
// });

// export default ProfileScreen;

import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Typography } from "../../theme/Colors";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import { ThemeToggle } from "../../components/Themes/ThemeToggle";
import { useEffect, useRef } from "react";

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const themeMode = useAuthStore((state) => state.theme);
  const theme =
    themeMode === "dark"
      ? {
          background: Typography.Colors.black,
          text: Typography.Colors.white,
        }
      : {
          background: Typography.Colors.white,
          text: Typography.Colors.black,
        };
  const logout = useAuthStore((state) => state.logout);
  const Navigation = useNavigation();

  // Animation values for theme transition
  const overlayScale = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const prevTheme = useRef(themeMode);

  // Handle theme change with smooth transition
  useEffect(() => {
    if (prevTheme.current !== themeMode) {
      // Start transition
      Animated.sequence([
        // Scale and fade in overlay while dimming content
        Animated.parallel([
          Animated.timing(overlayScale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(contentOpacity, {
            toValue: 0.2,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Hold for a moment
        Animated.delay(150),
        // Scale out overlay and restore content
        Animated.parallel([
          Animated.timing(overlayScale, {
            toValue: 1.2,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Reset scale for next transition
        overlayScale.setValue(0);
      });

      prevTheme.current = themeMode;
    }
  }, [themeMode, overlayScale, overlayOpacity, contentOpacity]);

  const handleNavigation = (screen, params = {}) => {
    if (screen) Navigation.navigate(screen, params);
  };

  const menuItems = [
    {
      title: "My Orders",
      icon: assets.tote,
      onPress: () => handleNavigation("MyOrdersScreen"),
    },
    {
      title: "Wishlist",
      icon: assets.heart,
      onPress: () =>
        handleNavigation("WishlistNavigator", { screen: "WishlistScreen" }),
    },
    {
      title: "Delivery Address",
      icon: assets.Location,
      iconStyle: styles.logodelivery,
      onPress: () => handleNavigation("DeliveryAddress"),
    },
    {
      title: "Offers",
      icon: assets.Offers,
      onPress: () => handleNavigation("PromoCodeScreen"),
    },
    {
      title: "Help",
      icon: assets.help,
      onPress: () => handleNavigation("HelpScreen"),
    },
    {
      title: "About Us",
      icon: assets.about,
      onPress: () => handleNavigation("AboutSection"),
    },
    {
      title: "Log Out",
      icon: assets.Logout,
      textStyle: styles.textlistlogout,
      onPress: logout,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={styles.secondsection}>
        <View style={styles.logocontainer}>
          <Image
            source={item.icon}
            style={[
              item.iconStyle || styles.logostyle,
              {
                tintColor:
                  item.icon === assets.Logout
                    ? Typography.Colors.red
                    : theme.text,
              },
            ]}
          />
          <Text
            style={[
              item.textStyle || styles.textlist,
              {
                color:
                  item.title === "Log Out" ? Typography.Colors.red : theme.text,
              },
            ]}
          >
            {item.title}
          </Text>
        </View>
        {item.title !== "Log Out" && (
          <View style={styles.arrowstyleview}>
            <Image
              source={assets.rightarrow}
              style={[styles.arrowstyle, { tintColor: theme.text }]}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Main Content with Opacity Animation */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: contentOpacity,
          },
        ]}
      >
        <TouchableOpacity onPress={() => handleNavigation("EditProfile")}>
          <View style={styles.firstsection}>
            <Image
              source={
                user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
              }
              style={styles.profilepic}
            />
            <View style={styles.textcontainer}>
              <Text style={[styles.textname, { color: theme.text }]}>
                {user?.name}
              </Text>
              <Text style={[styles.mailcontainer, { color: theme.text }]}>
                {user?.email}
              </Text>
            </View>
            <View style={styles.modeContainer}>
              <ThemeToggle />
            </View>
          </View>
        </TouchableOpacity>

        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={true}
        />

        <View style={styles.tncstyle}>
          <TouchableOpacity onPress={() => handleNavigation("PrivacyPolicy")}>
            <Text style={[styles.policystyle, { color: theme.text }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <View style={[styles.line, { backgroundColor: theme.text }]}></View>
          <TouchableOpacity onPress={() => handleNavigation("TermsnConditions")}>
            <Text style={[styles.conditionstyle, { color: theme.text }]}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Theme Transition Overlay with Scale Animation */}
      <Animated.View
        style={[
          styles.themeOverlay,
          {
            opacity: overlayOpacity,
            transform: [
              {
                scale: overlayScale,
              },
            ],
            backgroundColor: themeMode === "dark" ? Typography.Colors.black : Typography.Colors.white,
          },
        ]}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
 themeOverlay: {
  position: "absolute",
  top: "-70%",
  left: "-70%",
  width: "200%",
  height: "200%",
  borderRadius: 1000,
  marginTop: "100%",
  marginLeft: "100%",
  zIndex: 9999, // high z-index
  elevation: 20, // Android shadow
},

  modeContainer: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  firstsection: {
    paddingVertical: 35,
    flexDirection: "row",
  },
  secondsection: {
    paddingHorizontal: 14,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textcontainer: {
    marginLeft: 5,
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  profilepic: {
    borderRadius: 50,
    height: 62,
    width: 62,
  },
  textname: {
    fontSize: 18,
    fontFamily: Typography.font.bold,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  mailcontainer: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
  },
  iconStyle: {
    color: Typography.Colors.white,
  },
  logostyle: {
    tintColor: Typography.Colors.white,
    marginTop: 5,
    height: 20,
    width: 20,
  },
  logodelivery: {
    marginTop: 5,
    height: 25,
    width: 21.5,
  },
  logocontainer: {
    flexDirection: "row",
    gap: 20,
  },
  textlist: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
  },
  textlistlogout: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
  },
  arrowstyle: {
    paddingVertical: 8.5,
    height: 14,
    width: 10,
    alignSelf: "center",
  },
  arrowstyleview: {
    alignSelf: "center",
    paddingVertical: 8,
  },
  tncstyle: {
    gap: 5,
    flexDirection: "row",
    alignSelf: "center",
    paddingVertical: 20,
  },
  line: {
    gap: 5,
    height: 15,
    alignSelf: "center",
    borderWidth: 0.2,
    opacity: 0.5,
    color: Typography.Colors.lightgrey,
  },
  policystyle: {
    paddingVertical: 1.5,
  },
  conditionstyle: {
    paddingVertical: 1.5,
  },
});

export default ProfileScreen;