import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'
import { assets } from '../../../assets/images'

import { CategoryProps } from '../../models/homePage.type';
import { useFonts } from 'expo-font';
import { fonts } from '../../../assets/fonts';
import { BannerData, CardData, categoryData } from '../../constant';
import { HeaderData } from '../../constant'
import { BannerProps, TrendingProps } from '../../models/userInfo.type';
import Carousel from 'react-native-reanimated-carousel';
import CardComponent from '../../components/card/TrendingCards';


const { width } = Dimensions.get("window");


const HomeScreen = () => {
  const font = useFonts({
    'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
    'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
    'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
    'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
    'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
  });

  const renderItem = ({ item }: { item: CategoryProps }) => (
    <View style={styles.subContainer}>
      <Image source={item.image} style={styles.flatlistImage} />
      <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  const CarouselRenderItem = (item: BannerProps) => (
    <ImageBackground
      source={item.image}
      style={styles.imageBackground}
      imageStyle={styles.imagestyle}
    >
      <View style={styles.overlay}>
        <Image style={styles.logostyle} source={item.logoImage} resizeMode='contain' />
        <Text style={styles.text1}>{item.event}</Text>
        <Text style={styles.text1}>{item.discount}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const TrendingRenderItem=({item}:{item:TrendingProps})=>{return(
    <View style={{flex:1}}>
      <CardComponent img={item.img} logo={item.logo} offer={item.offer}/>
    </View>
  )}


  return (
    <ScrollView style={styles.container}>


      {/* Header View */}
      <View style={styles.HeaderStyle}>
        <HeaderComponent userImage={HeaderData.userImage} userName={HeaderData.userName} icon={HeaderData.icon} />
      </View>


      {/* Category View */}
      <View style={styles.cateoryContainer}>
        <View style={styles.mainImage}>
          <View style={styles.categoryImageContainer}>
            <Image source={assets.category} style={styles.categoryImage} />
          </View>
          <Text numberOfLines={1} style={[styles.text, { paddingTop: 8 }]}>Categories</Text>
        </View>
        <View style={styles.categorySubContainer}>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>


      {/* Carousel */}
      <View style={styles.carousel}>
      <Carousel
            loop
            autoPlay
            autoPlayInterval={3000}
            width={width}
            height={344.67}
            data={BannerData}
            scrollAnimationDuration={1000}
            renderItem={({item})=>CarouselRenderItem(item)}
            />
      </View>


      {/* Trending Cards */}
      <View style={styles.trendContainer}>
        <Text numberOfLines={1} style={styles.TrendingText}>Trending Offers</Text>
        {/* <FlatList/> */}
        <FlatList
        data={CardData}
        renderItem={TrendingRenderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },


  //HeaderStyle

  HeaderStyle: {
    // height: 48,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    // flex:1
  },
  //Category Style
  cateoryContainer: {
    paddingTop: 11,
    flexDirection: 'row',
    // flex:1,
    // backgroundColor:'pink'
  },
  categoryImageContainer: {
    height: 65,
    width: 65,
    backgroundColor: '#E2EAFF',
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center'
  },
  mainImage: {
    paddingLeft: 8,
    flex: 0.18,
  },
  categorySubContainer: {
    flex: 0.8
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
    color: '#272727'
  },
  subContainer: {
    width: 90,
    alignItems: "center",

  },

  //Carousel Style
  carousel:{
    paddingTop:40
  },
  imageBackground: {
    width: width,
    height: 344.67,
    justifyContent: "center",
    alignItems: "center",
},
imagestyle: {
    borderWidth: 0.5,
    borderColor: "white",
},
overlay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 23,
    paddingBottom: 25,
},
logostyle: {
    width: 175,
    height: 29,
},
text1: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
},
button: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    width: 100,
},
buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
},

//TrendingStyle
trendContainer:{
  paddingTop:30,
  paddingLeft:20,
  backgroundColor:'red'
},
TrendingText:{
  fontFamily:'SFPRODISPLAYMEDIUM',
  fontSize:20,
  color:'#272727'
}

})
export default HomeScreen
