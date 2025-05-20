import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Typography } from "../theme/Colors";
import { assets } from "../../assets/images";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { changePasswordService } from "../services/api/apiServices";
import CustomTextInput from "../components/textInput/CustomTextInput";
import CustomButton from "../components/button/CustomButton";

export default function PasswordchangeScreen({ route }) {
  const { email } = route.params;
  const state = useNavigationState((state) => state);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigation();

  const Passwordchangesuccess = async () => {
    if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      return;
    }
    if (confirmNewPassword.length < 8) {
      setConfirmPasswordError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setNewPasswordError("");
    setConfirmPasswordError("");
    setIsLoading(true);

    try {
      await changePasswordService({
        email,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });

      Alert.alert("Success", "Password changed successfully!");
      if (state.routes[1].name == "EditProfileScreen") {
        Navigation.goBack();
      } else {
        Navigation.navigate("LoginScreen");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to change password.");
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
        <Text style={styles.welcomeText}>New Password</Text>
        <Text style={styles.subText}>Set new password for your account</Text>
      </View>

      <CustomTextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
        error={newPasswordError}
        setError={setNewPasswordError}
        onValidate={(val) => val.length >= 8}
      />

      <CustomTextInput
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholder="Confirm Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
        error={confirmPasswordError}
        setError={setConfirmPasswordError}
        onValidate={(val) => val.length >= 8 && val === newPassword}
      />

      <CustomButton
        title={isLoading ? "Changing..." : "Change Password"}
        onPress={Passwordchangesuccess}
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
