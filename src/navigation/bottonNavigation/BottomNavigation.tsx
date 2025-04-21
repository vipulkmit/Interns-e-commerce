import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../appScreens/Home/HomeScreen";
import SearchScreen from "../../appScreens/Search/SearchScreen";
import FavouriteScreen from "../../appScreens/Favourites/FavouriteScreen";
import CartScreen from "../../appScreens/Cart/CartScreen";
import ProfileScreen from "../../appScreens/Profile/ProfileScreen";
import { setStatusBarHidden } from 'expo-status-bar';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { assets } from '../../../assets/images';
 



export default function BottomNavigation(){
    const Tab = createBottomTabNavigator()
    
    return(
        <Tab.Navigator screenOptions={({ route }) => {

            return ({

                tabBarIcon: ({ focused, size, color }) => {
                    let iconName: ImageSourcePropType;

                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 
                        assets.HomeBlue : 
                        assets.Home
                    }
                    else if (route.name === 'SearchScreen') {
                        iconName = focused ? 
                        assets.SearchBlue : 
                        assets.Search
                    } else if (route.name === 'FavouriteScreen') {
                        iconName = focused ? 
                        assets. HeartBlue: 
                        assets.Heart
                    } else if (route.name === 'CartScreen') {
                        iconName = focused ? 
                        assets.BagBlue : 
                        assets.Bag
                    } else if (route.name === 'ProfileScreen') {
                        iconName = focused ? 
                        assets.UserBlue : 
                        assets.User
                    }
                    return (
                        <Image source={iconName} style={{ width: 24, height: 24,objectFit:'contain'}} />
             ) },
                tabBarStyle: styles.tabBar,
                tabBarShowLabel:false,     
                  tabBarIconStyle: {
                    flex:1,

                  },          
            })
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false}}/>
            <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} options={{headerShown:false}}/>
            <Tab.Screen name="CartScreen" component={CartScreen} options={{headerShown:false}}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}

const styles= StyleSheet.create({
    tabBar:{
        height:65,
     }
})



