import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { Typography } from "../../theme/Colors";
import Icon from "react-native-vector-icons/Octicons";

type CustomTextInputProps = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  autoFocus?: boolean;
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  iconname?: string;
  iconsize?: number;
  iconcolor?: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  containerStyle,
  inputStyle,
  labelStyle,
  autoFocus,
  maxLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  iconname,
  iconsize,
  iconcolor,
}) => (
  <View style={[styles.container, containerStyle]}>
    {iconname && (
      <Icon
        name={iconname}
        size={iconsize}
        color={iconcolor}
        style={styles.iconStyle}
      />
    )}
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoFocus={autoFocus}
      maxLength={maxLength}
      editable={editable}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[styles.input, inputStyle]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // width:307,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Typography.Colors.white,
    borderWidth: 0.5,
    borderColor: Typography.Colors.greydark,
    borderRadius: 6,
    padding: 10,
  },
  label: {
    // borderWidth:0.1,
    fontFamily: Typography.font.bold,
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    // borderWidth: 1,
    borderColor: Typography.Colors.lightgrey,
    borderRadius: 6,
    padding: 5,
    fontSize: 16,
    marginRight: 10,
  },
  iconStyle: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 18.19,
  },
});

export default CustomTextInput;
