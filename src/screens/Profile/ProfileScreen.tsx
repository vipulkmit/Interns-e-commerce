import {
  Image,
  ScrollView,
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
  // console.log(user, "reiugrugn");
  const Navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);
  const handleEditProfileScreen = () => {
    Navigation.navigate("EditProfile");
  };

  const handlePrivacyPolicy = () => {
    Navigation.navigate("PrivacyPolicy");
  };

  const handleTermsnConditions = () => {
    Navigation.navigate("TermsnConditions");
  };
  const handleaboutsection = () => {
    Navigation.navigate("AboutSection");
  };

  const handlehelpsection = () => {
    Navigation.navigate("HelpScreen");
  };
  const handlewishlist = () => {
    Navigation.navigate("WishlistNavigator", { screen: "WishlistScreen" });
  };

  const handleDeliveryAddress = () => {
    Navigation.navigate("DeliveryAddress");
  };
  const handleOffers = () => {
    Navigation.navigate("PromoCodeScreen");
  };
  // console.log(user.profilePicture, "dsfihn");
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Typography.Colors.white }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleEditProfileScreen}>
          <View style={styles.firstsection}>
            <Image
              source={
                user?.profilePicture
                  ? { uri: user?.profilePicture }
                  : assets.Demo
              }
              // source={assets.Demo}
              style={styles.profilepic}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.textname}>{user?.name}</Text>
              <Text style={styles.mailcontainer}>{user?.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.tote} style={styles.logostyle} />
              <Text style={styles.textlist}>My Orders</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlewishlist}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.heart} style={styles.logostyle} />
              <Text style={styles.textlist}>Wishlist</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeliveryAddress}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.Location} style={styles.logodelivery} />
              <Text style={styles.textlist}>Delivery Address</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.Payment} style={styles.logo} />
              <Text style={styles.textlistpayment}>Payment Methods</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleOffers}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.Offers} style={styles.logostyle} />
              <Text style={styles.textlist}>Offers</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlehelpsection}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.help} style={styles.logostyle} />
              <Text style={styles.textlist}>Help</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleaboutsection}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.about} style={styles.logostyle} />
              <Text style={styles.textlist}>About</Text>
            </View>
            <View style={styles.arrowstyleview}>
              <Image source={assets.rightarrow} style={styles.arrowstyle} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={styles.secondsection}>
            <View style={styles.logocontainer}>
              <Image source={assets.Logout} style={styles.logostyle} />
              <Text style={styles.textlistlogout}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.tncstyle}>
          <TouchableOpacity onPress={handlePrivacyPolicy}>
            <Text style={styles.policystyle}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={handleTermsnConditions}>
            <Text style={styles.conditionstyle}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  firstsection: {
    paddingVertical: 44,
    flexDirection: "row",
  },
  secondsection: {
    // marginBottom: 7,
    // marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textcontainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  profilepic: {
    borderRadius: 50,
    height: 62,
    width: 62,
    // backgroundColor: "red",
  },
  textname: {
    fontSize: 18,
    fontFamily: Typography.font.bold,
    color: Typography.Colors.black,
    fontWeight: "500",
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
    // alignSelf: "center",
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
    // paddingVertical: 10,
    // marginBottom: 10,
    // alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
    color: Typography.Colors.blackdim,
  },
  arrowstyle: {
    // marginTop: 5,
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

// ImagePicker.openPicker({
//   width: 300,
//   height: 400,
//   cropping: true
// }).then(image => {
//   console.log(image);
// });

// ImagePicker.openCamera({
//   width: 300,
//   height: 400,
//   cropping: true,
// }).then(image => {
//   console.log(image);
// });
