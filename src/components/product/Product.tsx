import React from 'react'
import { FlatList, Image, ImageBackground, ImageSourcePropType, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { assets } from '../../../assets/images'
import { useFonts } from 'expo-font';
import { fonts } from '../../../assets/fonts';


type UserData = {
    id: string,
    images: ImageSourcePropType[],
    productName: string,
    brandName: string,
    initialRate: number,
    rate: number,
    dicount: string

}

const userData: UserData[] = [
    {
        id: '2',
        images: [assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1],
        productName: 'Women White Shirt',
        brandName: 'Brand Name',
        initialRate:999,
        rate: 799,
        dicount: '20% off'
    },
    {
        id: '3',
        images: [assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1, assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1],
        productName: 'Women White Shirt',
        brandName: 'Brand Name',
        initialRate: 999,
        rate: 799,
        dicount: '20% off'
    },
    {
        id: '4',
        images: [assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1, assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1],
        productName: 'Women White Shirt',
        brandName: 'Brand Name',
        initialRate: 999,
        rate: 799,
        dicount: '20% off'
    },
    {
        id: '5',
        images: [assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1],
        productName: 'Women White Shirt',
        brandName: 'Brand Name',
        initialRate: 999,
        rate: 799,
        dicount: '20% off'
    },
    {
        id: '6',
        images: [assets.Collection1, assets.SmallCollection1, assets.BackgroundCollection1],
        productName: 'Women White Shirt',
        brandName: 'Brand Name',
        initialRate: 999,
        rate: 799,
        dicount: '20% off'
    },

]



function Product() {
    const font = useFonts({
        'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
        'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
        'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
        'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
        'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
    });

    const renderItem = ({ item }: { item: UserData }) => (
        <View >
            <View style={styles.container}>
                <Image source={item.images[0]} style={styles.Collection} resizeMode='cover' />
                <View style={styles.subConatiner}>
                    <Image source={item.images[1]} style={styles.SmallCollection} resizeMode='cover' />
                    <TouchableOpacity>
                        <ImageBackground source={item.images[2]} style={styles.SmallCollection} resizeMode='cover'>
                            <Text style={styles.numberText}>+{item.images.length - 2}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.brandName}>{item.brandName}</Text>
                <View style={styles.Amount}>
                    <Text style={styles.initialRate}>Rs. {item.initialRate}</Text>
                    <Text style={styles.rate}>Rs.{item.rate}</Text>
                    <Text style={styles.dicount}>({item.dicount})</Text>
                </View>
            </View>
        </View>


    );

    return (
        <View >
            <FlatList
                data={userData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

    },
    subConatiner: {
        paddingLeft: 10,
        gap: 10,
    },
    Collection: {
        height: 216,
        width: 226,
        borderRadius: 10,
    },
    SmallCollection: {
        height: 103,
        width: 137,
        borderRadius: 10,
        justifyContent: 'center'
    },
    numberText: {
        color: '#ffffff',
        fontFamily: 'SFPRODISPLAYBOLD',
        fontSize: 35,
        alignSelf: 'center',
    },
    Amount:{
        flexDirection:'row'
    },
    productName:{
        fontSize:20,
        fontFamily:'SFPRODISPLAYMEDIUM',
        color:'#272727'
    },
    brandName:{
        fontSize:18,
        fontFamily:'SFPRODISPLAYREGULAR',
        color:'#272727'
    },
    initialRate:{
        fontSize:14,
        fontFamily:'SFPRODISPLAYREGULAR',
        color:'#848484',
        textDecorationLine:'line-through'
    },
    rate:{
        fontSize:20,
        fontFamily:'SFPRODISPLAYREGULAR',
        color:'#272727'
    },
    dicount:{
        fontSize:14,
        fontFamily:'SFPRODISPLAYREGULAR',
        color:'#0EB000'
    },
})

export default Product