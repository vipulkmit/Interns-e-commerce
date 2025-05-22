import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../../assets/images";
import { TrendingProps } from "../../models/HomePage.type";
import { BannerData, DealData } from "../../constant";
import Carousel from "react-native-reanimated-carousel";
import CardComponent from "../../components/card/CardComponent";
import ProductComponent from "../../components/product/ProductComponent";
import TopHeaderComponent from "../../components/header/TopHeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../theme/Colors";
import {
  CarousalData,
  Categories,
  Collection,
} from "../../services/api/apiServices";
import ContentLoader from "react-native-easy-content-loader";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const animations = useRef(
    BannerData.map(() => new Animated.Value(17))
  ).current;

  const renderCategoryPage = (id,name) => {
    navigation.navigate("Category", { id: id, name: name });
  };

  // Category Render Item
  const renderItem = ({ item }) => {
    // console.log(item.image);
    return (
      <Pressable
        style={styles.subContainer}
        onPress={() => renderCategoryPage(item.id,item.name)}
      >
        <Image source={{ uri: item.image }} style={styles.flatlistImage} />
        <Text style={styles.text} numberOfLines={1}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  // Carousel Render Item

  const CarouselRenderItem = ({ item }) => {
    // console.log(item.image,"cvadj",item.logoURL);
    
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={styles.imagestyle}
      >
        <View style={styles.overlay}>
          <Image
            style={styles.logostyle}
            source={{ uri: item.logoURL }}
            resizeMode="contain"
          />
          <Text style={styles.text1}>{item.description}</Text>
          <Text style={styles.text1}>{item.offer}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  const animateDot = (index: number, isActive: boolean) => {
    Animated.timing(animations[index], {
      toValue: isActive ? 17 : 17,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const TrendingRenderItem = ({ item }) => {
    // console.log(item.images,'item.images[0]',item.images[0])
    return (
      <View style={styles.container}>
        <CardComponent
          img={{ uri: item.images[0]?item.images[0]:item.images[1] }}
          logo={{ uri: item.brand.logo }}
          offer={item.discountPrice}
          productType={item.productType}
          onClick={() => renderProductPage(item)}
        />
      </View>
    );
  };

  //Deal of the day Render item
  const DealRenderItem = ({ item }: { item: TrendingProps }) => {
    return (
      <Pressable style={styles.dealView}>
        <CardComponent
          staticContainer={styles.staticContainer}
          img={item.img}
          amount={item.amount}
          productType={item.productType}
          productImgStyle={styles.productImage}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Pressable>
    );
  };

  const renderProductPage = (data: any) => {
    navigation.navigate("ProductDetailPage", { data: data });
  };

  //Product Render item
  const ProductRenderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <ProductComponent
          images={item.images}
          productName={item.title}
          brandName={item?.brand?.name}
          initialRate={item.discountPrice}
          rate={item.price}
          discount={item.discountPercentage}
          onClick={() => renderProductPage(item)}
        />
      </View>
    );
  };

  const ListHeader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [Category, setCategory] = useState([]);
    const [CarouselData, setCarouselData] = useState([]);
    const [ourCollection, setOurCollection] = useState([]);

    useEffect(() => {
      Collection()
        .then((data) => {
          setOurCollection(data?.data);
        })
        .catch((e) => {
          console.log("no data");
        });
    }, []);

    useEffect(() => {
      Categories()
        .then((data) => {
          // console.log(data.data, "eufiebfh");
          setCategory(data?.data);
        })
        .catch((e) => {
          console.log("no data");
        });
    }, []);

    useEffect(() => {
      CarousalData()
        .then((data) => {
          setCarouselData(data?.data.data);
        })
        .catch((e) => {
          console.log("no data");
        });
    }, []);

    return (
      <>
        {/* Header View */}
        <View style={styles.HeaderStyle}>
          <TopHeaderComponent />
        </View>

        {/* Category View */}
        <View style={styles.cateoryContainer}>
          <View style={styles.mainImage}>
            <View style={styles.categoryImageContainer}>
              <Image
                source={assets.category}
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </View>
            <Text numberOfLines={1} style={[styles.text, { paddingTop: 8 }]}>
              Categories
            </Text>
          </View>
          <View style={styles.categorySubContainer}>
            <FlatList
              data={Category}
              renderItem={renderItem}
              // keyExtractor={(item) => item?.id?.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Carousel */}
        <View style={styles.carousel}>
          <View style={{ position: "relative" }}>
            <Carousel
              loop
              autoPlay
              autoPlayInterval={3000}
              width={width}
              height={344.67}
              onSnapToItem={(index) => {
                setCurrentIndex(index);
              }}
              data={CarouselData}
              scrollAnimationDuration={1000}
              renderItem={CarouselRenderItem}
            />
            <View style={styles.paginationContainer}>
              {CarouselData?.map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      width: animations[index],
                      backgroundColor:
                        currentIndex === index
                          ? Typography.Colors.lightblack
                          : Typography.Colors.offwhite,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Trending Cards */}
        <View style={styles.trendContainer}>
          <Text
            numberOfLines={1}
            style={[styles.TrendingText, { paddingLeft: 10 }]}
          >
            Trending Offers
          </Text>
          <FlatList
            data={ourCollection.slice(5, 10)}
            renderItem={TrendingRenderItem}
            keyExtractor={(item) => item?.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
          />
        </View>

        <View style={styles.dealContainer}>
          <Text
            numberOfLines={1}
            style={[styles.TrendingText, { paddingLeft: 5 }]}
          >
            Deals Of The Day
          </Text>
        </View>
      </>
    );
  };

  const listFooter = () => {
    const [ourCollection, setOurCollection] = useState([]);
    useEffect(() => {
      Collection()
        .then((data) => {
          setOurCollection(data?.data);
        })
        .catch((e) => {
          console.log("no data");
        });
    }, []);

    return (
      <>
        <View style={styles.dealContainer}>
          <Text style={styles.TrendingText}>Our Collection</Text>
          <FlatList
            data={ourCollection?.slice(0, 10)}
            renderItem={ProductRenderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </>
    );
  };

  return (
    // <View style={styles.container}>
    <FlatList
      data={DealData.slice(0, 4)}
      renderItem={DealRenderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ gap: 10, backgroundColor: "#FFFFFF" }}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      ListHeaderComponentStyle={{
        flex: 1,
        backgroundColor: Typography.Colors.white,
      }}
      ListFooterComponent={listFooter}
      ListFooterComponentStyle={{
        flex: 1,
        backgroundColor: Typography.Colors.white,
      }}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },

  //HeaderStyle

  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    paddingHorizontal: 20,
  },
  //Category Style
  cateoryContainer: {
    paddingTop: 11,
    flexDirection: "row",
  },
  categoryImageContainer: {
    height: 65,
    width: 65,
    backgroundColor: Typography.Colors.skyblue,
    alignItems: "center",
    borderRadius: 40,
    justifyContent: "center",
  },
  mainImage: {
    paddingLeft: 8,
    flex: 0.18,
  },
  categorySubContainer: {
    flex: 0.8,
  },
  categoryImage: {
    height: 25,
    width: 25,
  },
  flatlistImage: {
    height: 62,
    width: 62,
    objectFit: "cover",
    borderRadius: 30,
  },
  text: {
    fontSize: 14,
    paddingTop: 10,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack,
  },
  subContainer: {
    width: 90,
    alignItems: "center",
  },

  //Carousel Style
  carousel: {
    paddingTop: 40,
  },
  imageBackground: {
    width: width,
    height: 344.67,
  },
  imagestyle: {
    borderWidth: 2,
    borderColor: Typography.Colors.white,
  },
  overlay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Typography.Colors.lightblack,
    opacity: 0.8,
  },
  logostyle: {
    width: 175,
    height: 29,
  },
  text1: {
    color: Typography.Colors.white,
    fontSize: 24,
    fontFamily: Typography.font.bold,
    textAlign: "center",
    paddingTop: 18,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: Typography.Colors.white,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 27,
    padding:6,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent:'center'
  },
  buttonText: {
    color: Typography.Colors.white,
    fontSize: 18,
    fontFamily: Typography.font.regular,
  },

  //TrendingStyle
  trendContainer: {
    paddingTop: 20,
    paddingLeft: 11,
  },
  TrendingText: {
    // fontFamily: Typography.font.bold,
    fontWeight:'500',
    fontSize: 20,
    color: Typography.Colors.lightblack,
  },

  //Deal of the day
  staticContainer: {
    flex: 1,
    paddingTop: 10,
  },
  dealView: {
    height: 251,
    width: "47%",
  },
  productImage: {
    width: "100%",
    flex: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dealContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingTop: 20,
    flex: 1,
  },
  row: {
    alignSelf: "center",
    gap: 20,
    marginHorizontal: 20,
  },
  buttonStyle: {
    backgroundColor: Typography.Colors.white,
    borderWidth: 1,
    borderColor: Typography.Colors.primary,
  },
  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
  },
  textStyle: {
    color: Typography.Colors.white,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 3,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  textstyle: {
    fontSize: 14,
    color: Typography.Colors.black,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  buttonstyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Typography.Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
