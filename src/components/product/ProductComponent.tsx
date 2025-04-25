import React from 'react'
import { FlatList, Image, ImageBackground, ImageSourcePropType, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'

import { ProductProps } from '../../models/homePage.type'



const ProductComponent = ({
    images,
    productName,
    brandName,
    initialRate,
    rate,
    discount
}: ProductProps) => {
    return (
        <View style={styles.mainContainer} >
            <View style={styles.container}>
                <View style={styles.CollectionImg}>
                    <Image source={images[0]} style={styles.Collection} resizeMode='contain' />
                </View>
                <View style={styles.subConatiner}>
                    <View style={styles.SmallCollectionImg}>
                    <Image source={images[1]} style={styles.SmallCollection} resizeMode='contain' />
                    </View>
                    <TouchableOpacity>
                        <View style={styles.SmallCollectionImg}>
                        <ImageBackground source={images[2]} style={styles.SmallCollection} resizeMode='contain'>
                            <Text style={styles.numberText}>+{images.length - 2}</Text>
                            <View style={styles.backgroundStyle}>
                            </View>
                        </ImageBackground>
                        </View>
                    </TouchableOpacity>
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
        paddingTop: 17,
        flex: 1,

    },
    dataContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 15,

    },
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    subConatiner: {
        paddingLeft: 10,
        gap: 10,
    },
    CollectionImg: {
        height: 216,
        width: 226,
        borderRadius: 10,
    },
    Collection: {
        height: '100%',
        width: '100%',

    },
    SmallCollectionImg:{
        height: 103,
        width: 137,
        borderRadius: 10,
    },
    SmallCollection: {
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    numberText: {
        color: '#ffffff',
        fontFamily: 'SFPRODISPLAYBOLD',
        fontSize: 33,
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 99
    },
    Amount: {
        flexDirection: 'row',
        paddingTop: 7,
        flex: 1,
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
    backgroundStyle: {
        backgroundColor: '#272727',
        opacity: 0.7,
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10
    }
})
export default ProductComponent