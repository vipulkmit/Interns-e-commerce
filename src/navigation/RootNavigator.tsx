import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuthStore from "../stores/useAuthStore";
import BottomTabs from "./BottomTabs";
import AuthNavigator from "./AuthNavigator";


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    return (
    // @ts-ignore: Suppress TypeScript error for 'id'
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isLoggedIn ? (
      <Stack.Screen name="Main" component={BottomTabs} />
    ) : (
      <Stack.Screen name="Auth" component={AuthNavigator} />
    )}
  </Stack.Navigator>
    )
}