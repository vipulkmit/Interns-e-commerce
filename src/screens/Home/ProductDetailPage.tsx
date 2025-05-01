import Carousel from "react-native-reanimated-carousel";
import { View, Text, ScrollView, StyleSheet, Dimensions, ImageBackground, Image, Animated, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BannerData } from "../../constant";
import { assets } from "../../../assets/images";
import HeaderComponent from "../../components/header/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../theme/Colors";
import Collapsible from "react-native-collapsible";
import { Products } from "../../services/api/apiServices";
// import { TextInput } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

const ProductDetailPage = () => {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const animations = useRef(BannerData.map(() => new Animated.Value(8))).current;

  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  // const { category,categoryName } = route.params;


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


  const handleSnap = (index: number) => {
    animateDot(currentIndex, false); // Shrink previous active dot
    animateDot(index, true);          // Expand new active dot
    setCurrentIndex(index);
  };

  const handleBackButton = () => { navigation.goBack() }


  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <HeaderComponent onClick={handleBackButton} />
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
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {

                  width: animations[index],

                  backgroundColor: currentIndex === index ? Typography.Colors.primary : Typography.Colors.offwhite
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
          <Text style={[styles.brandName, { fontFamily: Typography.font.medium }]}>Select Size</Text>
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



      <View >
        <TouchableOpacity onPress={toggleExpanded} style={styles.header1}>
          <View>
            {collapsed ?
              <View style={styles.accordionHeading}>
                <Text style={styles.accordionTitle}>Product Details</Text>
                <Image source={assets.Down} style={styles.accordionIcon} />
              </View> :
              <View style={styles.accordionHeading}>
                 <Text style={styles.accordionTitle}>Product Details</Text>
                 <Image source={assets.Up} style={styles.accordionIcon} />
              </View>}
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed}>
          <View style={styles.content}>
            <Text>This is the content inside the collapsible accordion.</Text>
          </View>
        </Collapsible>
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Typography.Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 14
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imagestyle: {
    borderWidth: 2,
    borderColor: Typography.Colors.white,
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
    fontFamily: Typography.font.medium,
    color: Typography.Colors.lightblack
  },
  brandName: {
    fontSize: 18,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack
  },
  initialRate: {
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: Typography.font.regular,
    color: '#848484',
    textDecorationLine: 'line-through'
  },
  rate: {
    fontSize: 20,
    paddingLeft: 17,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack
  },
  discount: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgreen,
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
    fontFamily: Typography.font.medium
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C1C1C1'
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
    backgroundColor: Typography.Colors.white,

  },
  colorCircle5: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: '#FEFFC1'

  },
  colorText: {
    color: Typography.Colors.lightblack,
    fontSize: 12,
    fontFamily: Typography.font.regular,
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
  size: {
    padding: 20,
  },
  sizeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 12,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.primary
  },
  sizeBox: {
    backgroundColor: Typography.Colors.white,
    height: 42,
    width: 42,
    borderWidth: 1,
    borderColor: Typography.Colors.white,
    // paddingRight:17,
    alignItems: 'center',
    justifyContent: 'center',
    // flex:1
    // gap:17
  },
  sizeText: {
    color: Typography.Colors.lightblack,
    fontSize: 12,
    fontFamily: Typography.font.regular,
    // textAlign:'center'
    // alignSelf:'center'
    // paddingLeft:8
    // alignSelf:'center'
  },
  sizeData: {
    flexDirection: 'row',
    gap: 17,
    paddingTop: 7
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },




  accordionContainer: {
    // flex: 1,
    // paddingTop: 24,
    // justifyContent: 'flex-start',
    // backgroundColor: '#f9f9f9',
    // backgroundColor:'red'
  },
  header1: {
    // backgroundColor: '#ddd',
    // backgroundColor:'red',
    // padding: 10,
    // borderRadius: 8,
    paddingHorizontal: 20
  },
  headerText: {
    // fontSize: 18,
    // fontFamily:Typography.font.medium,
    // color:Typography.Colors.lightgrey
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    // marginTop: 10,
  },
  accordionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomWidth:1
  },
  accordionTitle: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    color: Typography.Colors.lightblack,
    paddingVertical: 10,
    textAlign:'center'
  },
  accordionIcon: {
    height: 21,
    width: 21,
    // paddingVertical:10,
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})
export default ProductDetailPage





