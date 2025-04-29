import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/textInput/CustomTextInput";
import CustomButton from "../components/button/CustomButton";
import { TouchableOpacity } from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import useAuthStore from "../stores/useAuthStore";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const login = useAuthStore((state) => state.login);
  const Navigation = useNavigation();

  const handleLogInPress = () => {
    Navigation.goBack();
  };

  const handleSocialLoginPress = () => {
    console.log("login pressed");
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
        <Text style={styles.welcomeText}>Welcome to E-Com!</Text>
        <Text style={styles.subText}>Let's make your account.</Text>
      </View>

      <CustomTextInput
        // value={name}
        // onChangeText={setName}
        placeholder="Name"
        keyboardType="default"
        iconname="person"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomTextInput
        // value={email}
        // onChangeText={setEmail}
        placeholder="Your Email / Phone Number"
        keyboardType="email-address"
        iconname="mail"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

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
        title="Login"
        onPress={login}
        buttonStyle={styles.buttonstyle}
      />

      <View
        style={{
          alignSelf: "center",
          marginTop: 36,
          flexDirection: "row",
          gap: 10,
          paddingBottom: 22,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            height: 0.1,
            borderWidth: 0.2,
            width: 150,
            borderColor: Typography.Colors.lightgrey,
          }}
        ></View>
        <Text style={styles.orText}>OR</Text>
        <View
          style={{
            alignSelf: "center",
            borderWidth: 0.2,
            height: 0.1,
            width: 150,
            borderColor: Typography.Colors.lightgrey,
          }}
        ></View>
      </View>

      <Text style={styles.socialText}>Login using</Text>
      <View style={styles.socialButtons}>
        {/* <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image source={assets.applelogo} style={styles.socialIconApple} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image
            source={assets.facebooklogo}
            style={styles.socialIconfacebook}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image source={assets.googlelogo} style={styles.socialIconfacebook} />
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLogInPress}>
          <Text style={styles.registerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
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
    // marginBottom: 5,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 18,
    color: Typography.Colors.lightgrey,
    marginBottom: 30,
  },
  forgotContainer: {
    marginTop: 7,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    fontFamily: Typography.font.bold,
    fontSize: 16,
    color: Typography.Colors.primary,
  },
  orText: {
    fontFamily: Typography.font.bold,
    textAlign: "center",
    fontSize: 15,
    color: Typography.Colors.darkgrey,
    marginVertical: 10,
  },
  socialText: {
    alignSelf: "center",
    fontFamily: Typography.font.regular,
    fontSize: 16,
    color: Typography.Colors.black,
    marginBottom: 20,
  },
  socialButtons: {
    height: 40,
    overflow: "hidden",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 230,
    marginBottom: 32,
  },

  socialIconApple: {
    width: 29,
    height: 35,
  },
  socialIconfacebook: {
    width: 35,
    height: 35,
  },
  // socialIcongoogle: {
  //   width: 35.31,
  //   height: 35,
  // },

  registerContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: Typography.Colors.greydark,
  },
  registerLink: {
    fontSize: 14,
    color: Typography.Colors.logincolor,
    fontWeight: "bold",
  },
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
    marginTop: 32,
  },
  welcomeandsignup: {
    alignItems: "center",
    marginTop: 26,
    paddingBottom: 25,
  },
  labelStyle: {
    fontFamily: Typography.font.regular,
    fontSize: 16,
    color: Typography.Colors.lightgrey,
  },
  checkBoxstyle: {
    marginLeft: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Typography.Colors.lightgrey,
  },
  buttonstyle: {
    height: 52,
  },
});
