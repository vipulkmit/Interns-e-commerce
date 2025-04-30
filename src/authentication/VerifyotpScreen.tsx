import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";

import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { verifyOtpService } from "../services/api/apiServices";
import CustomButton from "../components/button/CustomButton";
import CustomTextInput from "../components/textInput/CustomTextInput";

export default function VerifyotpScreen() {
  // const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigation();

  const Sendverification = async () => {
    Navigation.navigate("Passwordchange");
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter both email and OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtpService({ otp });
      Alert.alert("Success", "OTP verified successfully!");
      console.log("Verify OTP Response:", response);
    } catch (error: any) {
      console.error("Verify OTP Error:", error.message);
      Alert.alert("Error", error.message || "Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={{marginBottom:10}}> */}
      <View style={styles.welcomeandsignup}>
        <Text style={styles.welcomeText}>Enter Verification Code</Text>
        <Text style={styles.subText}>
          We will send you a message to set or reset your new
        </Text>
        <Text style={styles.subsubtext}>password</Text>
      </View>
      {/* </View> */}

      <CustomTextInput
        value={otp}
        onChangeText={setotp}
        placeholder="Enter OTP here"
        keyboardType="number-pad"
      />

      <CustomButton
        title={isLoading ? "Verifying..." : "Confirm"}
        onPress={Sendverification}
        buttonStyle={styles.buttonstyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    // marginBottom:60,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.heavy,
    color: Typography.Colors.primary,
    marginTop: 10,
    marginBottom: 5,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 15,
    color: Typography.Colors.lightgrey,
  },
  subsubtext: {
    fontFamily: Typography.font.regular,
    fontSize: 15,
    color: Typography.Colors.lightgrey,
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
