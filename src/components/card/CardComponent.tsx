import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import { TrendingProps } from "../../models/homePage.type";


const CardComponent = ({
    id,
    img,
    productImgStyle,
    logo,
    offer,
    productType,
    amount
}: TrendingProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.imgView}> 
                <Image source={img} style={[styles.imgStyles, productImgStyle]} resizeMode="cover" />
            </View>
            <View style={styles.dataView}>
                {productType ? (
                    <Text numberOfLines={1} style={styles.productTypeStyle}>{productType}</Text>)
                    : (<Image source={logo} style={styles.logoStyle} resizeMode="stretch" />
                    )
                }
            </View>
            <View style={styles.dataView}>
                {offer ? (
                    <Text
                        style={[styles.offerStyle, { paddingTop: 7 }]}>Min {offer}% Off</Text>)
                    : (<Text numberOfLines={1} style={styles.offerStyle}>Under Rs. {amount}</Text>)}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        marginVertical:4
    },
    imgView:{
        flex:1
    },
    dataView:{
        flex:1,
        alignItems:'center'
    },
    imgStyles: {
        height: 227,
        width: 216,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    logoStyle: {
        marginTop: 7,
        alignSelf: 'center',
        height: 23,
        width: 35,
    },
    offerStyle: {
        fontSize: 20,
        fontFamily: 'SFPRODISPLAYMEDIUM'
    },
    productTypeStyle: {
        fontSize: 14,
        fontFamily: 'SFPRODISPLAYREGULAR',
        color: '#272727',
        paddingVertical: 4
    }
})

export default CardComponent