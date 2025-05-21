import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import useAuthStore from "../stores/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "./AuthApi";
import CustomButton from "../components/button/CustomButton";
import CustomTextInput from "../components/textInput/CustomTextInput";

export default function SignupScreen() {
  const { setUser } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigation();

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignupPress = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await registerUser({ name, email, password });
      setUser(response.data.userDetails);
      Navigation.navigate("LoginScreen");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogInPress = () => {
    Navigation.goBack();
  };

  const handleSocialLoginPress = () => {
    console.log("Social login pressed");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <View style={styles.containerlogo}>
            <Image source={assets.logofirst} style={styles.diamond} />
          </View>
        </View>

        <View style={styles.welcomeandsignup}>
          <Text style={styles.welcomeText}>Welcome to E-Com!</Text>
          <Text style={styles.subText}>Let's make your account.</Text>
        </View>

        <CustomTextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          keyboardType="default"
          iconname="person"
          iconsize={25}
          iconcolor={Typography.Colors.lightgrey}
        />

        <CustomTextInput
          value={email}
          onChangeText={setemail}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          iconname="mail"
          iconsize={25}
          iconcolor={Typography.Colors.lightgrey}
        />

        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          iconname="lock"
          iconsize={25}
          iconcolor={Typography.Colors.lightgrey}
        />

        <CustomTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          iconname="lock"
          iconsize={25}
          iconcolor={Typography.Colors.lightgrey}
        />

        <CustomButton
          title={isLoading ? "Signing up..." : "SignUp"}
          onPress={handleSignupPress}
          buttonStyle={styles.buttonstyle}
          disabled={isLoading}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.socialText}>Login using</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity onPress={handleSocialLoginPress}>
            <Image
              source={assets.facebooklogo}
              style={styles.socialIconfacebook}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSocialLoginPress}>
            <Image
              source={assets.googlelogo}
              style={styles.socialIconfacebook}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogInPress}>
            <Text style={styles.registerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
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
    transform: [{ rotate: "90deg" }],
  },
  welcomeandsignup: {
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.heavy,
    color: Typography.Colors.primary,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 18,
    color: Typography.Colors.lightgrey,
  },
  buttonstyle: {
    height: 52,
    marginTop: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Typography.Colors.lightgrey,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: Typography.Colors.darkgrey,
  },
  socialText: {
    textAlign: "center",
    fontFamily: Typography.font.regular,
    fontSize: 16,
    color: Typography.Colors.black,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  socialIconfacebook: {
    width: 35,
    height: 35,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: Typography.Colors.lightgrey,
  },
  registerLink: {
    fontSize: 14,
    color: Typography.Colors.primary,
    fontWeight: "bold",
  },
});
