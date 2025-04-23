import { FlatList, StyleSheet, View, Text, Image, ImageSourcePropType } from "react-native";
import { assets } from "../../../assets/images";
import React from 'react';
import { useFonts } from "expo-font";
import { fonts } from "../../../assets/fonts";


type Category = {
    id: string;
    image: ImageSourcePropType;
    name: string
}

const categoryData: Category[] = [
    {
        id: '2',
        image: assets.men,
        name: 'Men',
    },
    {
        id: '3',
        image: assets.women,
        name: 'Women',
    },
    {
        id: '4',
        image: assets.kids,
        name: 'Kids',
    },
    {
        id: '5',
        image: assets.Western,
        name: 'Western wear',
    },
    {
        id: '6',
        image: assets.kids,
        name: 'Traditional Wear',
    },
];


const Categories = () => {
    const font = useFonts({
        'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
        'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
        'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
        'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
        'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
    });



    const renderItem = ({ item }: { item: Category }) => (
        <View style={styles.subContainer}>
            <Image source={item.image} style={styles.flatlistImage} />
            <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.mainImage}>
                <View style={styles.categoryImageContainer}>
                    <Image source={assets.category} style={styles.categoryImage} />
                </View>
                <Text numberOfLines={1} style={[styles.text,{paddingTop:8}]}>Categories</Text>
            </View>
            <View style={{flex:0.9}}>
            <FlatList
                data={categoryData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
            /></View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
    },
    categoryImageContainer: {
        height: 65,
        width: 65,
        backgroundColor: '#E2EAFF',
        alignItems: 'center',
        borderRadius: 40,
        justifyContent: 'center'

    },
    mainImage:{
        paddingLeft:8,
        flex:0.2,
  
    },

    categoryImage: {
        height: 25,
        width: 25,
    },
    flatlistImage: {
        height: 62,
        width: 62,
        objectFit: 'cover',
        borderRadius: 30,
    },
    text: {
        fontSize: 14,
        paddingTop: 10,
        fontFamily: 'SFPRODISPLAYREGULAR',
        color:'#272727'
    },
    subContainer: {
        width:90,
        alignItems: "center",
        // backgroundColor:'red'    
    }

})

export default Categories;
