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
import { useNavigation } from "@react-navigation/native";
import SearchNavigator from "../../navigation/SearchNavigator";
import WishlistNavigator from "../../navigation/WishlistNavigator";
import CartNavigator from "../../navigation/CartNavigator";

const HeaderComponent = ({
  id,
  onClick,
  onPress,
  Title,
  productType,
}: MainHeaderProps) => {
  const navigation = useNavigation();
  // const handlewishlist = () => {
  //   navigation.navigate(SearchNavigator, { screen: “WishlistScreen” });
  // };

  return (
    <View>
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
          <Pressable
            onPress={() =>
              navigation.navigate(SearchNavigator, { screen: "SearchScreen" })
            }
          >
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
          <Pressable
            onPress={() =>
              navigation.navigate(CartNavigator, { screen: "CartScreen" })
            }
          >
            <Image source={assets.BagBlack} style={styles.icon} />
          </Pressable>
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
});

export default HeaderComponent;
