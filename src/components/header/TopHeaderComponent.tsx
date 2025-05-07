import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { HeaderProps } from "../../models/UserInfo.type";
import { Typography } from "../../theme/Colors";
import useAuthStore from "../../stores/useAuthStore";
import { assets } from "../../../assets/images";

const TopHeaderComponent = () => {
  const { user } = useAuthStore();
//   console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.UserContainer}>
        <Image
          source={
            user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
          }
          style={styles.userImage}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.userName}>
          {user.name}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableWithoutFeedback>
          <Image source={assets.MainSearch} style={styles.icon} resizeMode="cover" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  userImage: {
    height: 35,
    width: 35,
    // backgroundColor:'red'
  },
  userName: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    textAlign: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    height: 22,
    width: 22,
    color: Typography.Colors.lightblack,
  },
  UserContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    gap: 13,
  },
});

export default TopHeaderComponent;
