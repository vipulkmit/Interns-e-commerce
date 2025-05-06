import { Image, StyleSheet, Text, View } from "react-native";
import { Typography } from "../../theme/Colors";
import { TouchableOpacity } from "react-native";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

const EditProfileScreen = () => {
  const Navigation = useNavigation();

  const handlepasswordchange = () => {
    Navigation.navigate("ChangePasswordScreen");
  };
  const gobacknav = () => {
    Navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewaccount}>
        <TouchableOpacity onPress={gobacknav}>
          <Image source={assets.left} style={styles.arrowstyle} />
        </TouchableOpacity>
        <Text style={styles.textstyle}>My Account</Text>
      </View>
      <View style={styles.firstsection}>
        <TouchableOpacity>
          <Image source={assets.kids} style={styles.profilepic}></Image>
        </TouchableOpacity>
        <View style={styles.textcontainer}>
          <Text style={styles.textname}> Saurav Gupta</Text>
          <Text style={styles.mailcontainer}> gsaurav641@gmail.com</Text>
        </View>
      </View>

      <View>
        <View style={styles.detailcontainer}>
          <View style={styles.mindetailstyle}>
            <Image source={assets.name} style={styles.imgstyle} />
            <Text style={styles.staticstyle}>Name</Text>
          </View>
          <Text style={styles.dynamicstyle}>Saurav Gupta</Text>
        </View>

        <View style={styles.detailcontainer}>
          <View style={styles.mindetailstyle}>
            <Image source={assets.message} style={styles.imgstyle} />
            <Text style={styles.staticstyle}>Email</Text>
          </View>
          <Text style={styles.dynamicstyle}>gsaurav641@gmail.com</Text>
        </View>

        <TouchableOpacity onPress={handlepasswordchange}>
          <View style={styles.detailcontainer}>
            <View style={styles.mindetailstyle}>
              <Image source={assets.password} style={styles.imgstyle} />
              <Text style={styles.staticstyle}>Change Password</Text>
            </View>
            <Icon name="right" size={25} color={Typography.Colors.lightgrey} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    padding: 10,
  },
  firstsection: {
    paddingHorizontal: 30,
    paddingVertical: 44,
    flexDirection: "row",
  },
  profilepic: {
    borderRadius: 50,
    height: 62,
    width: 62,
    backgroundColor: "red",
  },
  textcontainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  arrowstyle: {
    paddingVertical: 2,
    height: 35,
    width: 35,
  },
  textstyle: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 5,
    fontWeight: "600",
    fontFamily: Typography.font.regular,
    color: Typography.Colors.primary,
  },
  viewaccount: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
  },
  imgstyle: {
    height: 24,
    width: 24,
  },
  detailcontainer: {
    height: 54,
    width: 375,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 8,
  },
  mindetailstyle: {
    gap: 16,
    flexDirection: "row",
  },
  staticstyle: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.regular,
    fontWeight: "600",
    fontSize: 17,
  },
  dynamicstyle: {
    marginTop: 6,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgrey,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default EditProfileScreen;
