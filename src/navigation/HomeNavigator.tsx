import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../appScreens/Home/HomeScreen'
import HomeScreen2 from '../appScreens/Home/HomeScreen2'



const Stack = createNativeStackNavigator()



const HomeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='HomeScreen2' component={HomeScreen2}/>
        </Stack.Navigator>
        )
}

export default HomeNavigator