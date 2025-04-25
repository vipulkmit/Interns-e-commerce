import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { assets } from '../../assets/images';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import WishlistNavigator from './WishlistNavigator';
import ProfileNavigator from './ProfileNavigator';
import CartNavigator from './CartNavigator';

export default function BottomTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            // @ts-ignore: Suppress TypeScript error for 'id'
            id="bottomTab"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const iconName: ImageSourcePropType = 
                        route.name === 'HomeNavigator' ? (focused ? assets.HomeBlue : assets.Home) :
                        route.name === 'SearchNavigator' ? (focused ? assets.SearchBlue : assets.Search) :
                        route.name === 'WishlistNavigator' ? (focused ? assets.HeartBlue : assets.Heart) :
                        route.name === 'CartNavigator' ? (focused ? assets.BagBlue : assets.Bag) :
                        route.name === 'ProfileNavigator' ? (focused ? assets.UserBlue : assets.User) :
                        assets.Home; 

                    return (
                        <Image source={iconName} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                    );
                },
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarIconStyle: {},
            })}
        >
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="SearchNavigator" component={SearchNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="WishlistNavigator" component={WishlistNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="CartNavigator" component={CartNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 65,
    },
});







