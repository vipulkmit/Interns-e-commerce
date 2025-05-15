import React from "react";
import { Image, Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { TrendingProps } from "../../models/HomePage.type";
import { Typography } from "../../theme/Colors";


const { width } = Dimensions.get("window");


const CardComponent = ({
    id,
    img,
    productImgStyle,
    logo,
    offer,
    productType,
    amount,
    staticContainer,
    onClick
}: TrendingProps) => {

    return (
        <Pressable style={[styles.container,staticContainer]} onPress={onClick}>
            <View style={[styles.imgView,productImgStyle]}> 
                <Image source={img} style={styles.imgStyles} />
            </View>
            <View style={styles.dataView}>
                {productType ? (
                    <Text numberOfLines={1} style={styles.productTypeStyle}>{productType}</Text>)
                    : (<View style={styles.logoImgContainer}>
                    <Image source={logo} style={styles.logoStyle} resizeMode="cover" />
                    </View>)
                }
            </View>
            <View style={styles.dataView}>
                {offer ? (
                    <Text
                        style={[styles.offerStyle, { paddingTop: 7 }]}>Min {offer}% Off</Text>)
                    : (<Text style={styles.offerStyle}>Under Rs. {amount}</Text>)}
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        marginVertical:4,
        // marginHorizontal:10
        // backgroundColor:'red'
    },
    imgView:{
        flex:1,
        // backgroundColor:'red',
        height: 227,
        width: 216,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    dataView:{
        flex:1,
        alignItems:'center'
    },
    imgStyles: {
        width:'100%',
        height:'100%',
        borderTopRightRadius:8,
        borderTopLeftRadius:8
       
    },
    logoImgContainer:{
        height: 23,
        width: 35,
    },
    logoStyle: {
        marginTop: 7,
        alignSelf: 'center',
        height:"100%",
        width:"100%"
    },
    offerStyle: {
        fontSize: 16.5,
        fontFamily: Typography.font.medium,
        color: Typography.Colors.lightblack,
    },
    productTypeStyle: {
        fontSize: 14,
        fontFamily: Typography.font.regular,
        color: Typography.Colors.lightblack,
        paddingVertical: 4
    }
})

export default CardComponent