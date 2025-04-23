import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen1 from '../appScreens/Home/HomeScreen1'
import HomeScreen2 from '../appScreens/Home/HomeScreen2'



const Stack = createNativeStackNavigator()



const HomeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='HomeScreen1' component={HomeScreen1}/>
            <Stack.Screen name='HomeScreen2' component={HomeScreen2}/>
        </Stack.Navigator>
        )
}

export default HomeNavigator