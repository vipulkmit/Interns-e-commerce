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

const HeaderComponent = ({
  id,
  onClick,
  Title,
  productType,
}: MainHeaderProps) => {
  // console.log(onClick);
  const navigation = useNavigation();
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
          <TouchableWithoutFeedback>
            <Image source={assets.MainSearch} style={styles.icon} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={assets.HeartBlack} style={styles.icon} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={assets.BagBlack} style={styles.icon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingHorizontal:5
  },
  productType: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    color: Typography.Colors.black,
    paddingLeft: 13,
    // alignSelf:'center'
  },
  iconContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor:'red'
  },
  icon: {
    height: 20,
    width: 20,
    color: Typography.Colors.lightblack,
    // backgroundColor:'#272727'
  },
  UserContainer: {
    flex: 2,
    // backgroundColor:'green',
    flexDirection: "row",
    // alignItems: 'center',
  },
  backIcon: {
    height: 28,
    width: 28,
  },

});

export default HeaderComponent;
