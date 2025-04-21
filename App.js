import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Categories from './src/components/categories/Categories';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/bottonNavigation/BottomNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
      //  <View style={styles.container}>
      //   <Categories />
      // </View> 
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
  );
}


const styles= StyleSheet.create({
  container:{
      flex:1,
  }
})