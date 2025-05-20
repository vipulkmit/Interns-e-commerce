import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { changePasswordService } from "../../services/api/apiServices";
import { assets } from "../../../assets/images";
import CustomTextInput from "../../components/textInput/CustomTextInput";
import { Typography } from "../../theme/Colors";
import CustomButton from "../../components/button/CustomButton";
import TopHeaderComponent from "../../components/header/TopHeaderComponent";

export default function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigation();

  const Passwordchangesuccess = async () => {
    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await changePasswordService({
        password: oldPassword,
        newPassword,
        confirmPassword: confirmNewPassword,
      });

      Alert.alert("Success", "Password changed successfully!");
      Navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.HeaderStyle}>
        <TopHeaderComponent />
      </View>
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
        value={oldPassword}
        onChangeText={setoldPassword}
        placeholder="Old Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomTextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
      />

      <CustomTextInput
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholder="Confirm New Password"
        secureTextEntry
        iconname="lock"
        iconsize={25}
        iconcolor={Typography.Colors.lightgrey}
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
  HeaderStyle: {
    marginTop: 10,
    backgroundColor: Typography.Colors.white,
    // paddingHorizontal: 20,
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
