import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/textInput/CustomTextInput";
import CustomButton from "../components/button/CustomButton";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import useAuthStore from "../stores/useAuthStore";
import { useNavigation } from "@react-navigation/native";

export default function PasswordchangeScreen() {
  const Navigation = useNavigation();

  const Sendverification = () => {
    Navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.containerlogo}>
          <View style={styles.diamond}>
            <Image source={assets.logofirst} style={styles.diamond} />
          </View>
        </View>
      </View>

      <View style={styles.welcomeandsignup}>
        <Text style={styles.welcomeText}>New Password</Text>
        <Text style={styles.subText}>Set new password for your account</Text>
        {/* <Text style={styles.subsubText}>password</Text> */}
      </View>

      <CustomTextInput
        // value={password}
        // onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomTextInput
        // value={password}
        // onChangeText={setPassword}
        placeholder="Confirm Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomButton
        title="Send Verification"
        onPress={Sendverification}
        buttonStyle={styles.buttonstyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.heavy,
    color: Typography.Colors.primary,
    marginTop: 20,
    marginBottom: 5,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 15,
    color: Typography.Colors.lightgrey,
    marginBottom: 30,
  },
  // subsubText: {
  //   fontFamily: Typography.font.regular,
  //   fontSize: 15,
  //   color: Typography.Colors.lightgrey,
  //   // alignItems: "center",

  // },
  containerlogo: {
    width: 72,
    height: 72,
    backgroundColor: Typography.Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  diamond: {
    width: 32,
    height: 32,
    transform: [{ rotate: "45deg" }],
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 42,
  },
  welcomeandsignup: {
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 48,
  },
  buttonstyle: {
    height: 52,
  },
});
