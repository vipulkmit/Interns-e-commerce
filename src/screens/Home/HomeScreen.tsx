import { Animated, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { assets } from '../../../assets/images'
import { CategoryProps, BannerProps, TrendingProps, ProductProps } from '../../models/homePage.type';
import { useFonts } from 'expo-font';
import { fonts } from '../../../assets/fonts';
import { BannerData, CardData, categoryData, DealData, ProductData ,HeaderData} from '../../constant';
import Carousel from 'react-native-reanimated-carousel';
import CardComponent from '../../components/card/CardComponent';
import ProductComponent from '../../components/product/ProductComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import TopHeaderComponent from '../../components/header/TopHeaderComponent';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../stores/useAuthStore'


const { width } = Dimensions.get("window");


const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout)

  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const animations = useRef(BannerData.map(() => new Animated.Value(17))).current;

  const font = useFonts({
    'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
    'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
    'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
    'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
    'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
  });


  // Category Render Item

  const renderItem = ({ item }: { item: CategoryProps }) => (
    <View style={styles.subContainer}>
      <Image source={item.image} style={styles.flatlistImage} />
      <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  // Carousel Render Item


  const CarouselRenderItem = (item: BannerProps) => (
    <ImageBackground
      source={item.image}
      style={styles.imageBackground}
      imageStyle={styles.imagestyle}>
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


  const animateDot = (index: number, isActive: boolean) => {
    Animated.timing(animations[index], {
      toValue: isActive ? 17 : 17,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };


  const handleSnap = (index: number) => {
    animateDot(currentIndex, false); 
    animateDot(index, true);          
    setCurrentIndex(index);
  };


  // Trending Render Item


  const TrendingRenderItem = ({ item }: { item: TrendingProps }) => {
    return (
      <View style={styles.container}>
        <CardComponent img={item.img} logo={item.logo} offer={item.offer} productType={item.productType} />
      </View>
    )
  }


  //Deal of the day Render item
  const DealRenderItem = ({ item }: { item: TrendingProps }) => {

    return (
      <Pressable style={styles.dealView} onPress={()=>{navigation.navigate('HomeScreen1')}}>
        <CardComponent staticContainer={styles.staticContainer} img={item.img} amount={item.amount} productType={item.productType} productImgStyle={styles.productImage} />
      </Pressable>
    )

  }



  //Product Render item
  const ProductRenderItem = ({ item }: { item: ProductProps }) => {

    return (
      <View style={styles.container}>
        <ProductComponent images={item.images} productName={item.productName} brandName={item.brandName} initialRate={item.initialRate} rate={item.rate} discount={item.discount}/>
        <View style={styles.buttonView}>
          <ButtonComponent icon={assets.HeartBlack} buttonText='Whislist' buttonStyle={styles.buttonStyle} />
          <ButtonComponent icon={assets.WhiteBag} buttonText='Add to Bag' TextStyle={styles.textStyle} buttonStyle={[styles.buttonStyle, { backgroundColor: '#002482' }]} />
        </View>
      </View>
    )
  }


  return (
    <ScrollView style={styles.container}>


      {/* Header View */}
      <View style={styles.HeaderStyle}>
        <TopHeaderComponent userImage={HeaderData.userImage} userName={HeaderData.userName} icon={HeaderData.icon} />
      </View>


      {/* Category View */}
      <View style={styles.cateoryContainer}>
        <View style={styles.mainImage}>
          <View style={styles.categoryImageContainer}>
            <Image source={assets.category} style={styles.categoryImage} resizeMode='contain' />
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
        <View style={{ position: 'relative' }}>
          <Carousel
            loop
            autoPlay
            autoPlayInterval={3000}
            width={width}
            height={344.67}
            onSnapToItem={handleSnap}
            data={BannerData}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => CarouselRenderItem(item)}
          />
          <View style={styles.paginationContainer}>
            {BannerData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: animations[index],
                    backgroundColor: currentIndex === index ? '#272727' : '#C4C4C4',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>



      {/* Trending Cards */}
      <View style={styles.trendContainer}>
        <Text numberOfLines={1} style={[styles.TrendingText, { paddingLeft: 10 }]}>Trending Offers</Text>
        {/* <FlatList/> */}
        <FlatList
          data={CardData}
          renderItem={TrendingRenderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>

      {/* Deal of the Day card */}
      <View style={styles.dealContainer}>
        <Text numberOfLines={1} style={[styles.TrendingText,{paddingBottom:10}]} >Deals Of The Day</Text>
        <FlatList
          data={DealData.slice(0, 4)}
          renderItem={DealRenderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Product card */}
      <View style={styles.dealContainer}>
        <Text style={styles.TrendingText}>Our Collection</Text>
        <FlatList
          data={ProductData}
          renderItem={ProductRenderItem}
          keyExtractor={(item) => item.id}
        />
      </View>



      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonstyle}onPress={logout}>
          <Text style={styles.textstyle}>Go Back to LoginScreen</Text>
          </TouchableOpacity>
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  //HeaderStyle

  HeaderStyle: {

    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,

  },
  //Category Style
  cateoryContainer: {
    paddingTop: 11,
    flexDirection: 'row',

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
  carousel: {
    paddingTop: 40
  },
  imageBackground: {
    width: width,
    height: 344.67,
  },
  imagestyle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  overlay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  logostyle: {
    width: 175,
    height: 29,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'SFPRODISPLAYBOLD',
    textAlign: "center",
    paddingTop: 18
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 27,
    width: 118,
    height: 34,
    alignItems: 'center'
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "SFPRODISPLAYREGULAR"
  },

  //TrendingStyle
  trendContainer: {
    paddingTop: 20,
    paddingLeft: 11,

  },
  TrendingText: {
    fontFamily: 'SFPRODISPLAYMEDIUM',
    fontSize: 20,
    color: '#272727',

  },

  //Deal of the day
  staticContainer:{
    flex:1,
    paddingTop:10
  },
  dealView: {
    height: 251,
    width: '47%',
  },
  productImage: {
    width: "100%",
    flex: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  
  },
  dealContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 20,
  },
  row: {
    gap: 20,
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#002482'
  },
  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: 'row'
  },
  textStyle: {
    color: "#FFFFFF"
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,                  
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 3,
    borderRadius: 4,
    marginHorizontal: 4,

  },
  textstyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  buttonstyle:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#002482',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default HomeScreen











