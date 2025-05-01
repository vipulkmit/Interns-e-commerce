import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen1 from '../screens/Home/HomeScreen1';
import HomeScreen2 from '../screens/Home/HomeScreen2';
import HomeScreen from '../screens/Home/HomeScreen';
import Categories from '../screens/Home/Category';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      // @ts-ignore: Suppress TypeScript error for 'id'
      id="HomeNavigator"
      // initialRouteName='Category'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
      <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
      <Stack.Screen name='Category' component={Categories}/>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
