import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Typography } from "../../theme/Colors";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import { ThemeToggle } from "../../components/Themes/ThemeToggle";
import { useEffect } from "react";

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

  // Reanimated shared values
  const themeProgress = useSharedValue(themeMode === "dark" ? 1 : 0);
  const overlayScale = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(1);
  const itemsTranslateY = useSharedValue(0);
  const rippleScale = useSharedValue(0);
  
  // Individual item press animations - create them outside renderItem
  const item0Scale = useSharedValue(1);
  const item1Scale = useSharedValue(1);
  const item2Scale = useSharedValue(1);
  const item3Scale = useSharedValue(1);
  const item4Scale = useSharedValue(1);
  const item5Scale = useSharedValue(1);
  const item6Scale = useSharedValue(1);

  // Enhanced theme change animation with Reanimated
  useEffect(() => {
    const targetValue = themeMode === "dark" ? 1 : 0;
    
    // Create sophisticated animation sequence
    const animateThemeChange = () => {
      // Phase 1: Dim content and start ripple effect
      contentOpacity.value = withTiming(0.3, { duration: 200 });
      itemsTranslateY.value = withTiming(-15, { 
        duration: 200,
        easing: Easing.out(Easing.quad)
      });
      
      // Start ripple effect
      rippleScale.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1.2, { 
          duration: 600,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(0, { duration: 0 })
      );
      
      // Phase 2: Main overlay animation with spring physics
      overlayScale.value = withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(100, withSpring(1, {
          damping: 15,
          stiffness: 150,
          mass: 1,
        }))
      );
      
      overlayOpacity.value = withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(100, withTiming(0.95, { 
          duration: 400,
          easing: Easing.out(Easing.cubic)
        })),
        withDelay(200, withTiming(0, { 
          duration: 450,
          easing: Easing.in(Easing.cubic)
        }))
      );

      // Phase 3: Color transition
      themeProgress.value = withDelay(150, withTiming(targetValue, {
        duration: 500,
        easing: Easing.inOut(Easing.quad)
      }));

      // Phase 4: Restore content with bounce
      contentOpacity.value = withDelay(400, withSpring(1, {
        damping: 12,
        stiffness: 200,
      }));
      
      itemsTranslateY.value = withDelay(350, withSpring(0, {
        damping: 15,
        stiffness: 180,
      }));

      // Reset overlay scale after animation
      overlayScale.value = withDelay(800, withTiming(0, { duration: 0 }));
    };

    animateThemeChange();
  }, [themeMode]);

  // Animated styles
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeProgress.value,
      [0, 1],
      [Typography.Colors.white, Typography.Colors.black]
    );
    
    return {
      backgroundColor,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      themeProgress.value,
      [0, 1],
      [Typography.Colors.black, Typography.Colors.white]
    );
    
    return {
      color,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const itemsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: itemsTranslateY.value }],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: overlayScale.value }],
    opacity: overlayOpacity.value,
  }));

  const rippleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleScale.value > 0 ? 0.3 : 0,
  }));

  // Individual item animated styles
  const item0AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item0Scale.value }],
  }));
  
  const item1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item1Scale.value }],
  }));
  
  const item2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item2Scale.value }],
  }));
  
  const item3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item3Scale.value }],
  }));
  
  const item4AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item4Scale.value }],
  }));
  
  const item5AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item5Scale.value }],
  }));
  
  const item6AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: item6Scale.value }],
  }));

  const handleNavigation = (screen, params = {}) => {
    if (screen) Navigation.navigate(screen, params);
  };

  // Helper function to get the right scale value and style for each item
  const getItemScaleAndStyle = (index) => {
    const scales = [item0Scale, item1Scale, item2Scale, item3Scale, item4Scale, item5Scale, item6Scale];
    const styles = [item0AnimatedStyle, item1AnimatedStyle, item2AnimatedStyle, item3AnimatedStyle, item4AnimatedStyle, item5AnimatedStyle, item6AnimatedStyle];
    
    return {
      scaleValue: scales[index],
      animatedStyle: styles[index]
    };
  };

  const handleItemPress = (onPress, index) => {
    const { scaleValue } = getItemScaleAndStyle(index);
    
    // Add press feedback animation
    scaleValue.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );
    
    // Execute the actual press action with slight delay
    setTimeout(() => onPress(), 150);
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

  const renderItem = ({ item, index }) => {
    const { animatedStyle } = getItemScaleAndStyle(index);

    return (
      <Animated.View style={[itemsAnimatedStyle, animatedStyle]}>
        <TouchableOpacity onPress={() => handleItemPress(item.onPress, index)}>
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
              <Animated.Text
                style={[
                  item.textStyle || styles.textlist,
                  item.title === "Log Out" 
                    ? { color: Typography.Colors.red }
                    : animatedTextStyle,
                ]}
              >
                {item.title}
              </Animated.Text>
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
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      {/* Ripple Effect Overlay */}
      <Animated.View
        style={[styles.rippleOverlay, rippleAnimatedStyle]}
        pointerEvents="none"
      >
        <Animated.View
          style={[
            styles.rippleInner,
            {
              backgroundColor: themeMode === "dark" 
                ? Typography.Colors.black 
                : Typography.Colors.white,
            }
          ]}
        />
      </Animated.View>

      {/* Main Theme Overlay */}
      <Animated.View
        style={[
          styles.themeOverlay,
          overlayAnimatedStyle,
          {
            backgroundColor: themeMode === "dark" 
              ? Typography.Colors.black 
              : Typography.Colors.white,
          }
        ]}
        pointerEvents="none"
      />

      {/* Main Content */}
      <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
        <TouchableOpacity onPress={() => handleNavigation("EditProfile")}>
          <View style={styles.firstsection}>
            <Image
              source={
                user?.profilePicture
                  ? { uri: user?.profilePicture }
                  : assets.Demo
              }
              style={styles.profilepic}
            />
            <View style={styles.textcontainer}>
              <Animated.Text style={[styles.textname, animatedTextStyle]}>
                {user?.name}
              </Animated.Text>
              <Animated.Text style={[styles.mailcontainer, animatedTextStyle]}>
                {user?.email}
              </Animated.Text>
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

        <Animated.View style={[styles.tncstyle, itemsAnimatedStyle]}>
          <TouchableOpacity onPress={() => handleNavigation("PrivacyPolicy")}>
            <Animated.Text style={[styles.policystyle, animatedTextStyle]}>
              Privacy Policy
            </Animated.Text>
          </TouchableOpacity>
          <Animated.View style={[styles.line, animatedTextStyle]} />
          <TouchableOpacity
            onPress={() => handleNavigation("TermsnConditions")}
          >
            <Animated.Text style={[styles.conditionstyle, animatedTextStyle]}>
              Terms and Conditions
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
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
    zIndex: 9999,
    elevation: 20,
  },
  rippleOverlay: {
    position: "absolute",
    top: "-100%",
    left: "-100%",
    width: "300%",
    height: "300%",
    borderRadius: 2000,
    marginTop: "150%",
    marginLeft: "150%",
    zIndex: 9998,
    elevation: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleInner: {
    width: '100%',
    height: '100%',
    borderRadius: 2000,
    opacity: 0.1,
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