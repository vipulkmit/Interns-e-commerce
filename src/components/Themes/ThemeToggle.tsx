import { StyleSheet, Switch, Text, View } from "react-native";
import useAuthStore from "../../stores/useAuthStore";
import { Typography } from "../../theme/Colors";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useAuthStore();
  //   const colors = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>🌞</Text>
      <Switch
        value={theme === "dark"}
        onValueChange={toggleTheme}
        thumbColor={
          theme === "dark"
            ? "typography.colors.black"
            : "typograpghy.Colors.white"
        }
        trackColor={{
          false: Typography.Colors.black,
          true: Typography.Colors.greydark,
        }}
      />
      <Text style={[styles.label]}>🌙</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  label: {
    fontSize: 18,
  },
});
