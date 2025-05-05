import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { Typography } from '../../theme/Colors'
import { assets } from '../../../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome'



const WishlistScreen = ({ route }) => {
    const { data } = route.params;
    // console.log(data, "dattttttaaaaaaaaaaaa");

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Wishlist</Text>
        <View style={styles.subContainer}>
            <View style={styles.imageConatiner}>
                <Image source={{uri: data.images[0]}} style={styles.Image} />
            </View>
            <View style={styles.productAmount}>
                <Text numberOfLines={2} style={styles.title}>{data.title}</Text>
                <Text style={styles.brand}>{data.brand.name}</Text>
            </View>
            <View style={styles.amountIcon}>
                <Text style={styles.amount}>Rs. {data.discountPrice}</Text>
                <Icon name='heart' style={styles.icon} size={18} />
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Typography.Colors.white
    },
    heading: {
        fontFamily: Typography.font.bold,
        fontWeight: '800',
        fontSize: 22,
        color: Typography.Colors.primary,
        paddingTop: 55,
        marginLeft: 43,
        paddingBottom: 16
    },
    Image: {
        height: 77,
        width: 87,
        borderRadius: 5,
        paddingHorizontal: 16,
        // flex:1
    },
    title: {
        fontFamily: Typography.font.bold,
        color: Typography.Colors.primary,
        fontSize: 14,
        fontWeight: '800'
    },
    brand: {
        fontFamily: Typography.font.bold,
        color: Typography.Colors.lightgrey,
        fontSize: 10
    },
    amount: {
        fontFamily: Typography.font.bold,
        color: Typography.Colors.black,
        fontSize: 16,
        paddingTop:10
    },
    productAmount: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // backgroundColor: 'pink',
        // alignItems:'center',
        justifyContent: 'center',
        gap: 8,
        // backgroundColor:'red',
        flex: 1.3
    },
    subContainer: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        paddingHorizontal: 30
        // flex: 1
    },
    icon: {
        color: Typography.Colors.lightpink,
    },
    imageConatiner: {
        padding: 18
    },
    amountIcon: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingRight: 18
    }
})

export default WishlistScreen