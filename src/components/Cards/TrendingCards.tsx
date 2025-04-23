import React from "react";
import { Image, Text, View, StyleSheet, FlatList } from "react-native";
import { assets } from "../../../assets/images"


const Cards = [
    {id:'1', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'2', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'3', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'4', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'5', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'6', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'7', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
    {id:'8', img:assets.trend, logo:assets.brandlogo, offer:'Min 30% off'},
];


const renderItem = ({ item }) => {
    return (
        <View style={{ margin: 10 }}>
            <Image  source={item.img} style={styles.imgstyles} />
            <Image source={item.logo} style={styles.logostyle} />
            <Text style={styles.offerstyle}>{item.offer}</Text>
        </View>
    );
}
const TrendingCards = () => {
 return (
    <View style={styles.container}>
      <FlatList
        data={Cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ paddingLeft: 10 }}
        />
    </View>
 )
}

const styles = StyleSheet.create({
    container: {
        flex:1
        // height:294,
        // width:416
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

export default TrendingCards;