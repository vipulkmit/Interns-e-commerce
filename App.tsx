import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootComponent from './src/navigation/Tabs';
// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';



export default function App() {
  return (
    <NavigationContainer>
      <RootComponent/>
      <StatusBar barStyle='dark-content'/>
    </NavigationContainer>
  );
}

