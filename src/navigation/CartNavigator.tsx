import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/Cart/CartScreen";
import OrderScreen from "../screens/Cart/OrderScreen";
const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="CartNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
