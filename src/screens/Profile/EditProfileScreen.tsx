import { Alert, Image, Linking, StyleSheet, Text, View } from "react-native";
import { Typography } from "../../theme/Colors";
import { TouchableOpacity } from "react-native";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import useAuthStore from "../../stores/useAuthStore";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import { updateUserdata } from "../../services/api/apiServices";
import { useState } from "react";

const EditProfileScreen = () => {
  const [image, setImage] = useState();
  const Navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  // console.log(user, "vfbvfrjb");
  const handlepasswordchange = () => {
    // Navigation.navigate("Passwordchange", { email: user?.email });
    Navigation.navigate("ChangePasswordScreen");
  };

  const handleImageChange = () => {
    Alert.alert("Choose Image", "Select image from:", [
      { text: "Cancel", style: "cancel" },
      { text: "Gallery", onPress: handleGallery },
      { text: "Camera", onPress: handleCamera },
    ]);
  };

  // const handleImage = async (uri: string) => {
  //   console.log(uri, "iubvnvbu");
  //   // try {
  //   //   console.log(uri, "nucvikvreireou");
  //   //   // const base64 = await RNFS.readFile(uri.replace("file://", ""), "base64");
  //   //   // const base64DataUri = `data:image/jpeg;base64,${base64}`;
  //   //   // const currentUser = useAuthStore.getState().user;
  //   //   // const UserSave = {
  //   //   //   id: currentUser?.id,
  //   //   //   userDetails: {
  //   //   //     ...currentUser.userDetails,
  //   //   //     profilePicture: base64DataUri,
  //   //   //   },
  //   //   // };
  //   //   // const updatedUser = await updateUserdata(UserSave);
  //   //   // useAuthStore.getState().setUser(updatedUser);
  //   // } catch (err) {
  //   //   console.error("Error updating profile picture:", err);
  //   // }
  // };

  const handleCamera = () => {
    launchCamera({ mediaType: "photo", includeBase64: false }, (response) => {
      // console.log(response);
      if (response.assets && response.assets[0]) {
        const uri = response.assets[0].uri || "";
        setImage(uri);
        // handleImage(uri);
      }
    });
  };

  const handleGallery = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.assets && response.assets[0]) {
          const uri = response.assets[0].uri || "";
          setImage(uri);
          // handleImage(uri);
        }
      }
    );
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
        <TouchableOpacity onPress={handleImageChange}>
          {/* <Image
            source={
              user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
            }
            style={styles.profilepic}
          /> */}
          <Image
            source={image ? { uri: image } : assets.Demo}
            style={styles.profilepic}
          />
        </TouchableOpacity>

        <View style={styles.textcontainer}>
          <Text style={styles.textname}>{user?.name}</Text>
          <Text style={styles.mailcontainer}>{user?.email}</Text>
        </View>
      </View>
      <View>
        <View style={styles.detailcontainer}>
          <View style={styles.mindetailstyle}>
            <Image source={assets.name} style={styles.imgstyle} />
            <Text style={styles.staticstyle}>Name</Text>
          </View>
          <Text style={styles.dynamicstyle}>{user?.name}</Text>
        </View>

        <View style={styles.detailcontainer}>
          <View style={styles.mindetailstyle}>
            <Image source={assets.message} style={styles.imgstyle} />
            <Text style={styles.staticstyle}>Email</Text>
          </View>
          <Text style={styles.dynamicstyle}>{user?.email}</Text>
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

// launchCamera(options?, callback);

// // You can also use as a promise without 'callback':
// const result = await launchCamera(options?);

// launchImageLibrary(options?, callback)

// // You can also use as a promise without 'callback':
// const result = await launchImageLibrary(options?);

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
    // backgroundColor: "red",
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
function setSelectedImage(arg0: string) {
  throw new Error("Function not implemented.");
}
