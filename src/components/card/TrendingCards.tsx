import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import { TrendingProps } from "../../models/userInfo.type";
import { fonts } from "../../../assets/fonts";
import { useFonts } from "expo-font";


const CardComponent = ({
    id,
    img,
    logo,
    offer,
}: TrendingProps) => {
    const font = useFonts({
        'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
        'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
        'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
        'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
        'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
    });
    return (
        <View style={styles.container}>
            <Image source={img} style={styles.imgstyles} />
            <Image source={logo} style={styles.logostyle} />
            <Text style={styles.offerstyle}>{offer}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection:'row'
        // flex:1,
        backgroundColor:'green'
    },
    imgstyles:{
        height:227,
        width:216,
        objectFit:'contain',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    logostyle:{
        marginTop:7,
        alignSelf:'center',
        height:23,
        width:35,

    },
    offerstyle:{
        alignSelf:'center',
        fontSize:20,
        marginTop:7,
    }

})

export default CardComponent