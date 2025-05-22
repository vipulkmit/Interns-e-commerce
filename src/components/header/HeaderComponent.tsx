import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MainHeaderProps } from "../../models/HomePage.type";
import { assets } from "../../../assets/images";
import { Typography } from "../../theme/Colors";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import SearchNavigator from "../../navigation/SearchNavigator";
import WishlistNavigator from "../../navigation/WishlistNavigator";
import CartNavigator from "../../navigation/CartNavigator";
import useAuthStore from "../../stores/useAuthStore";

const HeaderComponent = ({
  id,
  onClick,
  onPress,
  Title,
  productType, // Add this prop for cart item count
}: MainHeaderProps) => {
  const navigation = useNavigation();
  const cartQuantity = useAuthStore((state) => state.cart);
  // console.log(cartQuantity,"cartQuantity");

  const state = useNavigationState((state) => state);

  const onPressfunc = () => {
    if (state.routes[1]?.name === "ProductPage") {
      navigation.navigate(SearchNavigator, {
        screen: "SearchScreen",
      });
    } else {
      navigation.navigate("SearchScreen");
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.UserContainer}>
          <Pressable onPress={onClick}>
            <Image source={assets.ArrowLeft} style={styles.backIcon} />
          </Pressable>
          <Text numberOfLines={1} style={styles.productType}>
            {Title}{" "}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Pressable onPress={() => onPressfunc()}>
            <Image source={assets.MainSearch} style={styles.icon} />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate(WishlistNavigator, {
                screen: "WishlistScreen",
              })
            }
          >
            <Image source={assets.HeartBlack} style={styles.icon} />
          </Pressable>
          <View style={styles.cartContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate(CartNavigator, { screen: "CartScreen" })
              }
            >
              <Image source={assets.BagBlack} style={styles.icon} />
            </Pressable>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartQuantity}</Text>
              </View>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  productType: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    color: Typography.Colors.black,
    paddingLeft: 13,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    height: 20,
    width: 20,
    color: Typography.Colors.lightblack,
  },
  UserContainer: {
    flex: 2,
    flexDirection: "row",
  },
  backIcon: {
    height: 28,
    width: 28,
  },
  cartContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -6,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    // lineHeight: 16,
  },
});

export default HeaderComponent;