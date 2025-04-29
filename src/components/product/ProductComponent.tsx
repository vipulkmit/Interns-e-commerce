import React from 'react'
import { FlatList, Image, ImageBackground, ImageSourcePropType, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'

import { ProductProps } from '../../models/HomePage.type'



const ProductComponent = ({
    images,
    productName,
    brandName,
    initialRate,
    rate,
    discount,
    onClick
}: ProductProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.photoContainer}>
                <View style={styles.Container}>
                    <Image source={images[0]} style={styles.Collection} />
                </View>
                <View style={[ styles.Container,{ gap: 15 }]}>

                    <View style={styles.Container}>
                        <Image source={images[1]} style={styles.Collection} />
                    </View>

                    <Pressable style={styles.backgroundContainer} onPress={onClick} >
                        <ImageBackground source={images[2]} style={styles.subConatiner}  >
                            <Text style={styles.numberText}>+{images.length - 2}</Text>
                            <View style={styles.overlay} />
                        </ImageBackground>
                    </Pressable>
                </View>
            </View>

            <View style={styles.dataContainer}>
                <Text numberOfLines={1} style={styles.productName}>{productName}</Text>
                <Text numberOfLines={1} style={styles.brandName}>{brandName}</Text>
                <View style={styles.Amount}>
                    <Text style={styles.initialRate}>Rs. {initialRate}</Text>
                    <Text numberOfLines={1} style={styles.rate}>Rs.{rate}</Text>
                    <Text numberOfLines={1} style={styles.discount}>({discount}% Off)</Text>
                </View>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        height: 328,
        marginVertical: 20
    },
    photoContainer: {
        flexDirection: 'row',
        height: '70%',
        gap: 15
    },
    Container: {
        flex: 1
    },
    Collection: {
        height: '100%', 
        width: '100%',
        borderRadius:10
    },
    subConatiner: {
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        overflow:'hidden'
        // borderRadius:200
    },
    dataContainer: {
        // flex: 1,
        paddingLeft: 8,
        paddingBottom: 15,
        // backgroundColor: 'pink'
    },
  
    numberText: {
        color: '#ffffff',
        fontFamily: 'SFPRODISPLAYBOLD',
        fontSize: 33,
        // alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        zIndex: 99
    },

    overlay:{
        backgroundColor: '#272727',
        opacity: 0.7,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10
    },
 
    Amount: {
        flexDirection: 'row',
        paddingTop: 7,
        // flex: 1,
        // backgroundColor:'red'
    },
    productName: {
        paddingTop: 16,
        fontSize: 20,
        fontFamily: 'SFPRODISPLAYMEDIUM',
        color: '#272727'
    },
    brandName: {
        fontSize: 18,
        fontFamily: 'SFPRODISPLAYREGULAR',
        color: '#272727',
    },
    initialRate: {
        fontSize: 14,
        alignSelf: 'center',
        fontFamily: 'SFPRODISPLAYREGULAR',
        color: '#848484',
        textDecorationLine: 'line-through'
    },
    rate: {
        fontSize: 20,
        paddingLeft: 17,
        fontFamily: 'SFPRODISPLAYREGULAR',
        color: '#272727'
    },
    discount: {
        fontSize: 14,
        fontFamily: 'SFPRODISPLAYREGULAR',
        color: '#0EB000',
        paddingLeft: 10,
        alignSelf: 'center'
    },
    backgroundContainer:{
        flex:1,
        borderRadius:30
    }
})
export default ProductComponent