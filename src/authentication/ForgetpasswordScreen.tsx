import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { forgotPasswordService } from "../services/api/apiServices";
import CustomButton from "../components/button/CustomButton";
import CustomTextInput from "../components/textInput/CustomTextInput";

export default function ForgetpasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigation();

  const Sendverification = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPasswordService({ email });
      Alert.alert("Success", "Verification email sent successfully!");
      console.log("Forgot Password Response:", response);

      Navigation.navigate("Verifyotp", { email: email });
    } catch (error: any) {
      console.error("Forgot Password Error:", error.message);
      Alert.alert(
        "Error",
        error.message || "Failed to send verification email."
      );
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.welcomeText}>Forgot Password</Text>
        <Text style={styles.subText}>
          We will send you a message to set or reset your new{" "}
        </Text>
        <Text style={styles.subsubText}>password</Text>
      </View>

      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email / Phone Number"
        keyboardType="email-address"
        iconname="mail"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomButton
        title={isLoading ? "Sending..." : "Send Verification"}
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
  },
  subsubText: {
    fontFamily: Typography.font.regular,
    fontSize: 15,
    color: Typography.Colors.lightgrey,
    // alignItems: "center",
    marginBottom: 30,
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

// useEffect(() => {
//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     () => {
//       if (isSignUp === 'true') {
//         navigation.navigate(SCREEN_URLS.signUp);
//       } else {
//         navigation.navigate(SCREEN_URLS.login);
//       }

//       return true;
//     }
//   );

//   return () => backHandler.remove();
// }, []);
