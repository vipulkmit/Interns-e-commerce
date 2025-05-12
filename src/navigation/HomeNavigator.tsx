import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsPage from '../screens/Home/ProductsPage';
import ProductDetailPage from '../screens/Home/ProductDetailPage';
import HomeScreen from '../screens/Home/HomeScreen';
import Categories from '../screens/Home/Category';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="HomeNavigator"
      // initialRouteName='Category'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductsPage" component={ProductsPage} />
      <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} />
      <Stack.Screen name='Category' component={Categories}/>
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
