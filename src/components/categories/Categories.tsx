import { FlatList, StyleSheet, View, Text, Image, ImageSourcePropType } from "react-native";
import { assets } from "../../../assets/images";
import React from 'react';


type Category = {
    id: string;
    image: ImageSourcePropType;
    name: string
}

const categoryData: Category[] = [
    {
        id: '1',
        image: assets.category1,
        name: 'Categories',
    },
    {
        id: '2',
        image: assets.category1,
        name: 'Men',
    },
    {
        id: '3',
        image: assets.category1,
        name: 'Women',
    },
    {
        id: '4',
        image: assets.category1,
        name: 'Kids',
    },
    {
        id: '5',
        image: assets.category1,
        name: 'Western Wear',
    },
    {
        id: '6',
        image: assets.category1,
        name: 'Accessories',
    },
];

const Categories = () => {
    const renderItem = ({ item }: { item: Category }) => (
        <View style={styles.subContainer}>
            <Image source = {item.image} style={styles.image}/>
            <Text style={styles.text} >{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categoryData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                />
        </View>
    );
};


const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        height:62,
        width:62,
        objectFit:'cover'
    },
    text:{
        fontSize:14,
        paddingTop:10
    },
    subContainer:{
        alignItems:"center",
        paddingRight:22 
    }

})

export default Categories;
