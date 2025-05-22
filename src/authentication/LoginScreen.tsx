import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import useAuthStore from "../stores/useAuthStore";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import { useNavigation } from "@react-navigation/native";
import { loginService } from "../services/api/apiServices";
import CustomButton from "../components/button/CustomButton";
import CustomTextInput from "../components/textInput/CustomTextInput";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelected, setSelection] = useState(false);
  const Navigation = useNavigation();
  const { setToken, setUser } = useAuthStore();

  const handleForgotPasswordPress = () => {
    Navigation.navigate("Forgetpassword");
  };

  const handleRegisterPress = () => {
    Navigation.navigate("Signup");
  };

  const handleSocialLoginPress = () => {
    console.log("Social login pressed");
  };

  const validateInputs = () => {
    let isvalid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isvalid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isvalid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isvalid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isvalid = false;
    } else {
      setPasswordError("");
    }

    return isvalid;
  };

  const handleLoginPress = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      const response = await loginService({ email, password });

      if (response.access_token) {
        useAuthStore.setState({ isLoggedIn: true });
        setUser(response.userDetails);
        setToken(response.access_token);
        Navigation.reset({
          index: 0,
          routes: [{ name: "BottomTabs" }],
        });
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
      if (error.response?.status === 404) {
        Alert.alert(
          "Invalid Email ID or Password",
          "The Email ID or Password you entered is incorrect."
        );
      } else {
        Alert.alert(
          "Error",
          error.message || "Login failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.containerlogo}>
          <Image source={assets.logofirst} style={styles.diamond} />
        </View>
      </View>

      <View style={styles.welcomeandsignup}>
        <Text style={styles.welcomeText}>Welcome back to E-Com!</Text>
        <Text style={styles.subText}>Sign in to continue</Text>
      </View>

      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Your Email"
        keyboardType="email-address"
        iconname="person"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
        error={emailError}
        setError={setEmailError}
        onValidate={(val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)}
      />

      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
        error={passwordError}
        setError={setPasswordError}
        onValidate={(val) => val.length >= 8}
      />

      <View style={styles.checkboxAndForgot}>
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
        title={isLoading ? "Logging in...." : "Login"}
        onPress={handleLoginPress}
        buttonStyle={styles.buttonstyle}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
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
  safeArea: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Typography.Colors.white,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
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
    marginTop: 26,
    marginBottom: 28,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.bold,
    color: Typography.Colors.navyblue,
    marginBottom: 5,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 18,
    color: Typography.Colors.lightgrey,
  },
  checkboxAndForgot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  forgotContainer: {
    // marginTop: 3,
  },
  forgotText: {
    fontFamily: Typography.font.bold,
    fontWeight: "700",
    fontSize: 16,
    color: Typography.Colors.primary,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
    marginBottom: 20,
    gap: 10,
  },
  divider: {
    height: 1,
    width: 120,
    backgroundColor: Typography.Colors.lightgrey,
  },
  orText: {
    fontFamily: Typography.font.bold,
    fontSize: 15,
    color: Typography.Colors.darkgrey,
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: 230,
    alignSelf: "center",
    marginBottom: 32,
  },
  socialIconfacebook: {
    width: 35,
    height: 35,
  },
  socialIcongoogle: {
    width: 35,
    height: 35,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
