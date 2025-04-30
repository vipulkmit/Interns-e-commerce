import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Authentication/LoginScreen";
import SignupScreen from "../Authentication/SignupScreen";
import ForgetpasswordScreen from "../Authentication/ForgetpasswordScreen";
import VerifyotpScreen from "../Authentication/VerifyotpScreen";
import PasswordchangeScreen from "../Authentication/PasswordchangeScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="AuthNavigator"
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgetpassword" component={ForgetpasswordScreen} />
      <Stack.Screen name="Verifyotp" component={VerifyotpScreen} />
      <Stack.Screen name="Passwordchange" component={PasswordchangeScreen} />
    </Stack.Navigator>
  );
}
