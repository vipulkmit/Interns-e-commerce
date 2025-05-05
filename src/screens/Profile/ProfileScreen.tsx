import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Typography } from "../../theme/Colors";
import { assets } from "../../../assets/images";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.firstsection}>
          <Image source={assets.kids} style={styles.profilepic}></Image>
          <View style={styles.textcontainer}>
            <Text style={styles.textname}> Saurav Gupta</Text>
            <Text style={styles.mailcontainer}> gsaurav641@gmail.com</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.secondsection}>
          <View style={styles.logocontainer}>
            <Image source={assets.tote} style={styles.logostyle} />
            <Text style={styles.textlist}> My Orders</Text>
          </View>
          <View style={styles.arrowstyleview}>
            <Image source={assets.rightarrow} style={styles.arrowstyle} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
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
      <TouchableOpacity>
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
      <TouchableOpacity>
        <View style={styles.secondsection}>
          <View style={styles.logocontainer}>
            <Image source={assets.Payment} style={styles.logo} />
            <Text style={styles.textlistpayment}>Payment Methods</Text>
          </View>
          <View style={styles.arrowstyleview}>
            <Image source={assets.rightarrow} style={styles.arrowstyle} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
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
      <TouchableOpacity>
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
      <TouchableOpacity>
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
      <TouchableOpacity>
        <View style={styles.secondsection}>
          <View style={styles.logocontainer}>
            <Image source={assets.Logout} style={styles.logostyle} />
            <Text style={styles.textlist}>Log Out</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.tncstyle}>
        <TouchableOpacity>
          <Text style={styles.policystyle}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity>
          <Text style={styles.conditionstyle}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 14,
    paddingVertical: 17,
    flexDirection: "row",
    // alignSelf:'center'
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
    backgroundColor: "red",
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
    height: 20,
    width: 20,
  },
  logo: {
    height: 14,
    width: 20,
  },
  logodelivery: {
    height: 25,
    width: 21.5,
  },
  logocontainer: {
    alignSelf: "center",
    // justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  textlist: {
    // paddingVertical: 6,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Typography.font.medium,
    color: Typography.Colors.blackdim,
  },
  textlistpayment: {
    // marginBottom: 5,
    // paddingVertical: 1,
    alignSelf: "center",
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
  },
  conditionstyle: {
    color: Typography.Colors.darksilver,
    paddingVertical: 1.5,
  },
});

export default ProfileScreen;
