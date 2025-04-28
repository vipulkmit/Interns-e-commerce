
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import HomeScreen2 from '../screens/Home/HomeScreen2'
import HomeScreen1 from '../screens/Home/HomeScreen1'



const Stack = createNativeStackNavigator()



const HomeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='HomeScreen1' component={HomeScreen1}/>
            <Stack.Screen name='HomeScreen2' component={HomeScreen2}/>
        </Stack.Navigator>
        )
}

export default HomeNavigator