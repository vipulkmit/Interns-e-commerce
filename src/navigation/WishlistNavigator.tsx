import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';


const Stack = createNativeStackNavigator();


const WishlistNavigator = () => {
  return (
    <Stack.Navigator
    // @ts-ignore: Suppress TypeScript error for 'id'
    id="WishlistNavigator"
    // initialRouteName='Category'
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
  </Stack.Navigator>
  )
}

export default WishlistNavigator