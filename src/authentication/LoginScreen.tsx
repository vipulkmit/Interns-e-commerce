import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/textInput/CustomTextInput";
import CustomButton from "../components/button/CustomButton";
import { TouchableOpacity } from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import useAuthStore from "../stores/useAuthStore";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const [isSelected, setSelection] = useState(false);
  const Navigation = useNavigation();

  const handleForgotPasswordPress = () => {
    Navigation.navigate("Forgetpassword");
  };

  const handleRegisterPress = () => {
    Navigation.navigate("Signup");
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
        <Text style={styles.welcomeText}>Welcome back to E-Com!</Text>
        <Text style={styles.subText}>Sign in to continue</Text>
      </View>

      <CustomTextInput
        // value={email}
        // onChangeText={setEmail}
        placeholder="Your Email / Phone Number"
        keyboardType="email-address"
        iconname="person"
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <AdvancedCheckbox
          value={isSelected}
          onValueChange={setSelection}
          label="Remember me"
          labelStyle={styles.labelStyle}
          checkedColor={Typography.Colors.checkboxcolour}
          uncheckedColor={Typography.Colors.lightgrey}
          checkBoxStyle={styles.checkBoxstyle}
          size={18}
        />
        <TouchableOpacity
          onPress={handleForgotPasswordPress}
          style={styles.forgotContainer}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

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
          paddingBottom: 32,
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
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image
            source={assets.facebooklogo}
            style={styles.socialIconfacebook}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image source={assets.googlelogo} style={styles.socialIcongoogle} />
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerLink}>Register</Text>
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
    fontFamily: Typography.font.bold,
    color: Typography.Colors.navyblue,
    marginTop: 20,
    marginBottom: 5,
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
    marginBottom: 42,
  },

  socialIconfacebook: {
    width: 35,
    height: 35,
  },
  socialIcongoogle: {
    width: 35.31,
    height: 35,
  },

  registerContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: Typography.Colors.black,
  },
  registerLink: {
    fontSize: 14,
    color: Typography.Colors.primary,
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
    marginTop: 40,
  },
  welcomeandsignup: {
    alignItems: "center",
    marginTop: 26,
    paddingBottom: 28,
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
