import Carousel from "react-native-reanimated-carousel";
import { View, Text, ScrollView, StyleSheet, Dimensions, ImageBackground, Image, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFonts } from 'expo-font'
import { BannerData } from "../../constant";
import { fonts } from "../../../assets/fonts";
import { assets } from "../../../assets/images";
import HeaderComponent from "../../components/header/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
// console.log(width);

const HomeScreen2 = () => {
    const navigation = useNavigation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  // const animations = BannerData.map(() => new Animated.Value(8)); // initial width = 8
  const animations = useRef(BannerData.map(() => new Animated.Value(8))).current;


  const font = useFonts({
    'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
    'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
    'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
    'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
    'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
  });

  const CarouselRenderItem = () => (
    <ImageBackground
      resizeMode="cover"
      source={assets.Collection1}
      style={styles.imageBackground}
      imageStyle={styles.imagestyle}>
    </ImageBackground>
  );

  const animateDot = (index: number, isActive: boolean) => {
    Animated.timing(animations[index], {
      toValue: isActive ? 8 : 8,  
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // const handleSnap = (index: number) => {
  //   setCurrentIndex(index);
  //   BannerData.forEach((_, i) => {
  //     animateDot(i, i === index);
  //   });
  // };

  const handleSnap = (index: number) => {
    animateDot(currentIndex, false); // Shrink previous active dot
    animateDot(index, true);          // Expand new active dot
    setCurrentIndex(index);
  };
const handleBackButton=()=>{navigation.navigate('HomeScreen')}


  return (
    <ScrollView>
      <View style={styles.header}>
        <HeaderComponent back={assets.ArrowLeft} icon={assets.MainSearch} icon1={assets.HeartBlack} icon2={assets.BagBlack} onClick={handleBackButton}/>
      </View>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={2000}
        width={width}
        onSnapToItem={handleSnap}
        height={width * 1.2}
        data={BannerData}
        scrollAnimationDuration={1000}
        renderItem={CarouselRenderItem} />
      <View style={styles.paginationContainer}>
        {BannerData.map((_, index) => {
          // const isActive = index === currentIndex;
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  // width: isActive ? 20 : 8,
                  width: animations[index],
                  // backgroundColor: isActive ? '#333' : '#ccc',
                  backgroundColor: currentIndex === index ? '#002482' : '#ccc'
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.shareContainer}>
          <Text numberOfLines={1} style={styles.productName}>Womens White Shirt</Text>
          <Image source={assets.Share} style={styles.ShareIcon} />
        </View>
        <Text numberOfLines={1} style={styles.brandName}>Brand Name</Text>
        <View style={styles.amountTimer}>
          <View style={styles.Amount}>
            <Text style={styles.initialRate}>Rs. 1000</Text>
            <Text numberOfLines={1} style={styles.rate}>Rs.10000</Text>
            <Text numberOfLines={1} style={styles.discount}>(20% Off)</Text>
          </View>
          <View style={styles.timer}>
            <Image source={assets.Clock} style={styles.clockIcon} />
            <Text style={styles.timerText}>13 hours left</Text>
          </View>
        </View>
      </View>
      <View style={styles.colour}>
        <Text style={styles.productName}>Color</Text>
        <Text style={styles.colorText}>White</Text>
        <View style={styles.circle}>
          <View style={styles.colorCircle1} />
          <View style={styles.colorCircle2} />
          <View style={styles.colorCircle3} />
          <View style={styles.colorCircle}>
            <View style={styles.colorCircle4} />
          </View>
          <View style={styles.colorCircle5} />
        </View>
      </View>
      <View style={styles.size}>
        <View style={styles.sizeView}>
          <Text style={[styles.brandName,{fontFamily:'SFPRODISPLAYMEDIUM'}]}>Select Size</Text>
          <TouchableOpacity>
            <Text style={styles.textStyle}>Size Chart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sizeData}>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>XS</Text>
          </View>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>S</Text>
          </View>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>M</Text>
          </View>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>L</Text>
          </View>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>XL</Text>
          </View>
        </View>
      </View>
      <View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 14
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imagestyle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  dataContainer: {
    // flex: 1,
    // paddingLeft: 8,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    // backgroundColor: 'pink'
  },
  Amount: {
    flexDirection: 'row',
    paddingTop: 7,
    flex: 2,
    // backgroundColor:'red'
  },
  productName: {
    // paddingTop: 12,
    fontSize: 20,
    fontFamily: 'SFPRODISPLAYMEDIUM',
    color: '#272727',
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
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    // backgroundColor: 'red',
  },
  ShareIcon: {
    height: 24,
    width: 24,
    alignSelf: 'center'
  },
  timer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 7,
    // backgroundColor:'green',
    justifyContent: 'flex-end',
    gap: 6
  },
  clockIcon: {
    height: 14,
    width: 14,
  },
  timerText: {
    color: '#FF4646',
    fontSize: 12,
    fontFamily: 'SFPRODISPLAYMEDIUM'
  },
  amountTimer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  colour: {
    paddingHorizontal: 20
  },
  circle: {
    flexDirection: 'row',
    gap: 17,
    paddingTop: 7,
    alignItems: 'center'
  },
  colorCircle: {
    height: 42,
    width: 42,
    borderRadius: 20,
    borderWidth: 2,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#C1C1C1'
  },
  colorCircle1: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: '#FFCFB5'
  },
  colorCircle2: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: '#96F9FF'

  },
  colorCircle3: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: '#FEC8FF'

  },
  colorCircle4: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // alignItems:'center',
    // justifyContent:'center',
    // borderWidth:1,
    backgroundColor: '#FFFFFF'

  },
  colorCircle5: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: '#FEFFC1'

  },
  colorText: {
    color: '#272727',
    fontSize: 12,
    fontFamily: 'SFPRODISPLAYREGULAR'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    // transitionDuration: '300ms',
  },
  size:{
    padding:20,
  },
  sizeView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  textStyle:{
    fontSize:12,
    fontFamily:'SFPRODISPLAYREGULAR',
    color:'#002482'
  },
  sizeBox:{
    backgroundColor:'#FFFFFF',
    height:42,
    width:42,
    borderWidth:1,
    borderColor:'#FFFFFF',
    paddingRight:17,
    alignItems:'center',
    justifyContent:'center',
    // gap:17
  },
  sizeText:{
    color:'#272727',
    fontSize:12,
    fontFamily:'SFPRODISPLAYREGULAR',
    // alignSelf:'center'
    paddingLeft:8
    // alignSelf:'center'
  },
  sizeData:{
    flexDirection:'row',
    gap:17,
    paddingTop:7
  }
})
export default HomeScreen2





