import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "../../theme/Colors";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const Navigation = useNavigation();

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
            style={item.iconStyle || styles.logostyle}
          />
          <Text style={item.textStyle || styles.textlist}>{item.title}</Text>
        </View>
        {item.title !== "Log Out" && (
          <View style={styles.arrowstyleview}>
            <Image source={assets.rightarrow} style={styles.arrowstyle} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    // <ScrollView style={{ flex: 1, backgroundColor: Typography.Colors.white }}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation("EditProfile")}>
        <View style={styles.firstsection}>
          <Image
            source={
              user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
            }
            style={styles.profilepic}
          />
          <View style={styles.textcontainer}>
            <Text style={styles.textname}>{user?.name}</Text>
            <Text style={styles.mailcontainer}>{user?.email}</Text>
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
          <Text style={styles.policystyle}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={() => handleNavigation("TermsnConditions")}>
          <Text style={styles.conditionstyle}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    paddingHorizontal: 20,
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
    color: Typography.Colors.black,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  mailcontainer: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgrey,
  },
  logostyle: {
    marginTop: 5,
    height: 20,
    width: 20,
  },
  logo: {
    marginTop: 5,
    height: 14,
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
    color: Typography.Colors.blackdim,
  },
  textlistlogout: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
    color: Typography.Colors.red,
  },
  textlistpayment: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
    color: Typography.Colors.blackdim,
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
    color: Typography.Colors.darksilver,
    paddingVertical: 1.5,
  },
  conditionstyle: {
    color: Typography.Colors.darksilver,
    paddingVertical: 1.5,
  },
});

export default ProfileScreen;
