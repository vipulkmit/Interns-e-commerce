import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import SearchScreen from '../screens/Search/SearchScreen';


const Stack = createNativeStackNavigator();


const SearchNavigator = () => {
  return (
    <Stack.Navigator
    // @ts-ignore: Suppress TypeScript error for 'id'
    id="SearchNavigator"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
  </Stack.Navigator>
  )
}

export default SearchNavigator