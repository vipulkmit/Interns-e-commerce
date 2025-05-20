import { Image, StyleSheet, Text, View } from "react-native";
import { Typography } from "../../theme/Colors";
import useAuthStore from "../../stores/useAuthStore";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";

const TopHeaderComponent = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.UserContainer}>
        <Image
          source={
            user?.profilePicture ? { uri: user?.profilePicture } : assets.Demo
          }
          style={styles.userImage}
          // resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.userName}>
          {user?.name}
        </Text>
      </View>
      {/* <View style={styles.iconContainer}>
        <Pressable >
          <Image source={assets.MainSearch} style={styles.icon} resizeMode="cover" />
        </Pressable>
      </View> */}
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
    borderRadius: 20,
    resizeMode: "cover",
    overflow: "hidden",
  },
  userName: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    textAlign: "center",
    textTransform: "capitalize",
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
