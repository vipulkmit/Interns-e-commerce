import Carousel from "react-native-reanimated-carousel";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BannerData } from "../../constant";
import { assets } from "../../../assets/images";
import HeaderComponent from "../../components/header/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../theme/Colors";
import Collapsible from "react-native-collapsible";
import {
  AddToCart,
  AddToWishlist,
  Products,
} from "../../services/api/apiServices";
import SizeComponent from "../../components/product/SizeComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import { startMapper } from "react-native-reanimated";
import { Button } from "@react-navigation/elements";
import ButtonComponent from "../../components/button/ButtonComponent";

const width = Dimensions.get("window").width;

const ProductDetailPage = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);

  // console.log(data,"dataaaaaaaaaaa");


  const [selectedSize, setSelectedSize] = useState(data?.productSize?.length > 0 ? 0 : null);
  const [selectSize, setSelectSize] = useState(data?.productSize?.length > 0 ? data.productSize[0]?.id : '');
  
  const handleSizeAddToCart = (index, sizeId) => {
    // console.log(sizeId, index, "sixeeee");
    setSelectedSize(index), 
    setSelectSize(sizeId);
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(data?.productColor?.length > 0 ? data.productColor[0]?.id : '');

  const handleColorAddToCart = (index, colorId) => {
    // console.log(colorId, index, "coloorrr");
    setSelectedColorIndex(index), 
    setSelectedColor(colorId);
  };

  useEffect(() => {
    if (data?.productColor?.length > 0) {
      setSelectedColor(data.productColor[0]?.id);
    }
    
    if (data?.productSize?.length > 0) {
      setSelectSize(data.productSize[0]?.id);
    }
  }, [data]);



  const [wishlistToggle, setWislistToggle] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const response = await AddToWishlist(data.id);
      setWislistToggle(!wishlistToggle);
      // console.log("Added to wishlist:", response);
    } catch (error) {
      // console.error("Error adding to wishlist:", error);
      Alert.alert("Error", "Already added to wishlist");
    }
  };
  const [cartToggle, setCartToggle] = useState(false);


  const handleAddToCart = async () => {
    try {
      if (!selectedColor) {
        Alert.alert("Please select a color");
        return;
      }
      
      if (!selectSize) {
        Alert.alert("Please select a size");
        return;
      }

      
      const response = await AddToCart(
        data?.id, 
        1,  
        selectedColor, 
        selectSize
      );
      
      setCartToggle(!cartToggle);
      // console.log("Added to cart successfully:", response);
      Alert.alert("Success", "Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add to cart");
    }
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const toggleExpanded1 = () => {
    setCollapsed1(!collapsed1);
  };

  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
  };

  const SpecificationRenderItem = ({ item }) => {
    return (
      <View style={styles.specificContainer}>
        <Text style={styles.specificationName}>{item.name}</Text>
        <Text style={styles.specificationValue}>{item.value}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  const CarouselRenderItem = (item) => {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{ uri: item.item }}
        style={styles.imageBackground}
        imageStyle={styles.imagestyle}
      ></ImageBackground>
    );
  };

  const animateDot = (index: number, isActive: boolean) => {
    Animated.timing(animations[index], {
      toValue: isActive ? 8 : 8,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animations = useRef(
    BannerData.map(() => new Animated.Value(8))
  ).current;

  const handleSnap = (index: number) => {
    animateDot(currentIndex, false); // Shrink previous active dot
    animateDot(index, true); // Expand new active dot
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    const numRating = Number(rating);
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= numRating) {
        // Filled star
        stars.push(<Icon key={i} name="star" size={28} style={styles.icon} />);
      } else {
        // Empty star
        stars.push(
          <Icon key={i} name="star-o" size={28} style={styles.icon} />
        );
      }
    }
    return stars;
  };

  const renderYellowStars = (rating) => {
    const numRating = Number(rating);
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= numRating) {
        // Filled star
        stars.push(
          <Icon
            key={i}
            name="star"
            size={17}
            style={[styles.icon1, { color: Typography.Colors.yellow }]}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Icon key={i} name="star-o" size={17} style={styles.icon1} />
        );
      }
    }
    return stars;
  };

  const ratingData = ({ item }) => {
    return (
      <>
        <View style={styles.reviews}>
          {renderYellowStars(data.averageRating)}
          <Text style={styles.Reviews}>{item.rating}</Text>
        </View>
        <Text style={styles.reviewsComment}>{item.comment}</Text>
        <View style={{ flexDirection: "row", gap: 9 }}>
          {item?.images?.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.reviewImage}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* heading */}
      <View style={styles.header}>
        <HeaderComponent
          onClick={handleBackButton}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </View>

      {/* CAROUSAL */}

      <Carousel
        loop
        autoPlay
        autoPlayInterval={2000}
        width={width}
        onSnapToItem={handleSnap}
        height={width * 1.2}
        data={data?.images}
        scrollAnimationDuration={1000}
        renderItem={(item) => CarouselRenderItem(item)}
      />

      {/* carousal pagination */}
      <View style={styles.paginationContainer}>
        {data?.images?.map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: animations[index],
                  backgroundColor:
                    currentIndex === index
                      ? Typography.Colors.primary
                      : Typography.Colors.offwhite,
                },
              ]}
            />
          );
        })}
      </View>

      {/* details container */}
      <View style={styles.dataContainer}>
        <View style={styles.shareContainer}>
          <Text numberOfLines={1} style={styles.productName}>
            {data.title}
          </Text>
          <Image source={assets.Share} style={styles.ShareIcon} />
        </View>
        <Text numberOfLines={1} style={styles.brandName}>
          {data.brand.name}
        </Text>
        <View style={styles.amountTimer}>
          <View style={styles.Amount}>
            <Text style={styles.initialRate}>Rs. {data.price}</Text>
            <Text numberOfLines={1} style={styles.rate}>
              Rs. {data.discountPrice}
            </Text>
            <Text numberOfLines={1} style={styles.discount}>
              ({data.discountPercentage}% Off)
            </Text>
          </View>
          <View style={styles.timer}>
            <Image source={assets.Clock} style={styles.clockIcon} />
            <Text style={styles.timerText}>13 hours left</Text>
          </View>
        </View>
      </View>

      {/* color set */}

      <View style={styles.colour}>
        <Text style={styles.productName}>Color</Text>
        <Text style={styles.colorText}>
          {data?.productColor[selectedColorIndex]?.name}
        </Text>

        <View style={styles.circle}>
          {data.productColor.map((colorItem, index) => (
            <Pressable
              key={index}
              onPress={() => handleColorAddToCart(index, colorItem?.id)}
            >
              {selectedColorIndex === index ? (
                <View style={styles.colorCircle}>
                  <View
                    style={[
                      styles.colorCircle1,
                      { backgroundColor: colorItem.hexCode },
                    ]}
                  />
                </View>
              ) : (
                <View
                  style={[
                    styles.colorCircle1,
                    { backgroundColor: colorItem.hexCode },
                  ]}
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* size set */}

      <View style={styles.size}>
        <View style={styles.sizeView}>
          <Text
            style={[styles.brandName, { fontFamily: Typography.font.medium }]}
          >
            Select Size
          </Text>
          <TouchableOpacity>
            <Text style={styles.textStyle}>Size Chart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sizeData}>
          {data.productSize.map((sizeItem, index) => (
            <SizeComponent
              key={index}
              size={sizeItem.name}
              // Compare the current size with the selected size
              selectedSize={selectedSize === index}
              // Set this specific size as selected
              onClick={() => handleSizeAddToCart(index, sizeItem?.id)}
            />
          ))}
        </View>
      </View>

      {/* button  */}

      <View style={styles.buttonView}>
        <ButtonComponent
          icon={wishlistToggle ? assets.HeartBlue : assets.heart}
          buttonText="Whislist"
          buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor: wishlistToggle
                ? Typography.Colors.offwhite
                : Typography.Colors.white,
            },
          ]}
          TextStyle={{
            color: wishlistToggle
              ? Typography.Colors.primary
              : Typography.Colors.black,
          }}
          onClick={handleAddToWishlist}
        />
        <ButtonComponent
          onClick={handleAddToCart}
          icon={assets.WhiteBag}
          buttonText="Add to Bag"
          TextStyle={styles.textStyle}
          buttonStyle={[
            styles.buttonStyle,
            { backgroundColor: Typography.Colors.primary },
          ]}
        />
      </View>

      {/* accordian */}

      <View style={{ paddingTop: 10 }}>
        <Pressable onPress={toggleExpanded} style={styles.header1}>
          <View>
            {collapsed ? (
              <View
                style={[
                  styles.accordionHeading,
                  { borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
                ]}
              >
                <Text style={styles.accordionTitle}>Product Details</Text>
                <Image source={assets.Down} style={styles.accordionIcon} />
              </View>
            ) : (
              <View style={styles.accordionHeading}>
                <Text style={styles.accordionTitle}>Product Details</Text>
                <Image source={assets.Up} style={styles.accordionIcon} />
              </View>
            )}
          </View>
        </Pressable>

        <Collapsible collapsed={collapsed}>
          <View style={styles.content}>
            <Text numberOfLines={4} style={styles.accordionText}>
              {data.description}
            </Text>
          </View>
        </Collapsible>
      </View>

      <View>
        <Pressable onPress={toggleExpanded1} style={styles.header1}>
          <View>
            {collapsed1 ? (
              <View
                style={[
                  styles.accordionHeading,
                  { borderBottomWidth: 1.5, borderBottomColor: "#EAEAEA" },
                ]}
              >
                <Text style={styles.accordionTitle}>Specifications</Text>
                <Image source={assets.Down} style={styles.accordionIcon} />
              </View>
            ) : (
              <View style={styles.accordionHeading}>
                <Text style={styles.accordionTitle}>Specifications</Text>
                <Image source={assets.Up} style={styles.accordionIcon} />
              </View>
            )}
          </View>
        </Pressable>

        <Collapsible collapsed={collapsed1}>
          <View style={styles.content}>
            <FlatList
              data={data.specifications}
              renderItem={SpecificationRenderItem}
              numColumns={2}
              // ListHeaderComponent={ListHeader}
              // ListHeaderComponentStyle={styles.header}
              // contentContainerStyle={{backgroundColor:'green'}}
            />
          </View>
        </Collapsible>
      </View>

      <View>
        <Pressable onPress={toggleExpanded2} style={styles.header1}>
          <View>
            {collapsed2 ? (
              <View
                style={[
                  styles.accordionHeading,
                  { borderBottomWidth: 1.5, borderBottomColor: "#EAEAEA" },
                ]}
              >
                <Text style={styles.accordionTitle}>Ratings & Reviews</Text>
                <Image source={assets.Down} style={styles.accordionIcon} />
              </View>
            ) : (
              <View style={styles.accordionHeading}>
                <Text style={styles.accordionTitle}>Ratings & Reviews</Text>
                <Image source={assets.Up} style={styles.accordionIcon} />
              </View>
            )}
          </View>
        </Pressable>

        <Collapsible collapsed={collapsed2}>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Text style={styles.averageRating}>{data.averageRating}</Text>
              {renderStars(data.averageRating)}
            </View>
            <FlatList data={data.reviews} renderItem={ratingData} />
          </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  header: {
    backgroundColor: Typography.Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
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
    flexDirection: "row",
    paddingTop: 7,
    flex: 2,
    // backgroundColor:'red'
  },
  productName: {
    // paddingTop: 12,
    fontSize: 20,
    fontFamily: Typography.font.medium,
    // fontWeight:'700',
    color: Typography.Colors.lightblack,
  },
  brandName: {
    fontSize: 18,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack,
  },
  initialRate: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: Typography.font.regular,
    color: "#848484",
    textDecorationLine: "line-through",
  },
  rate: {
    fontSize: 20,
    paddingLeft: 17,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack,
  },
  discount: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgreen,
    paddingLeft: 10,
    alignSelf: "center",
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems:'center',
    // backgroundColor: 'red',
  },
  ShareIcon: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
  timer: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 7,
    // backgroundColor:'green',
    justifyContent: "flex-end",
    gap: 6,
  },
  clockIcon: {
    height: 14,
    width: 14,
  },
  timerText: {
    color: "#FF4646",
    fontSize: 12,
    fontFamily: Typography.font.medium,
  },
  amountTimer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  colour: {
    paddingHorizontal: 20,
  },
  circle: {
    flexDirection: "row",
    gap: 17,
    paddingTop: 7,
    alignItems: "center",
  },
  colorCircle: {
    height: 42,
    width: 42,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C1C1C1",
  },
  colorCircle1: {
    height: 28,
    width: 28,
    borderRadius: 20,
    elevation: 5,
    // borderWidth:1,
    // backgroundColor: '#FFCFB5'
  },
  colorCircle2: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: "#96F9FF",
  },
  colorCircle3: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: "#FEC8FF",
  },
  colorCircle4: {
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: Typography.Colors.white,
  },
  colorCircle5: {
    height: 28,
    width: 28,
    borderRadius: 20,
    // borderWidth:1,
    backgroundColor: "#FEFFC1",
  },
  colorText: {
    color: Typography.Colors.lightblack,
    fontSize: 12,
    fontFamily: Typography.font.regular,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 12,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.primary,
  },
  sizeBox: {
    backgroundColor: Typography.Colors.white,
    height: 42,
    width: 42,
    borderWidth: 1,
    borderColor: Typography.Colors.white,
    // paddingRight:17,
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    gap: 17,
    paddingTop: 7,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: Typography.Colors.primary,
  },
  textStyle: {
    color: Typography.Colors.white,
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
    paddingHorizontal: 20,
  },
  headerText: {
    // fontSize: 18,
    // fontFamily:Typography.font.medium,
    // color:Typography.Colors.lightgrey
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,
    // marginTop: 10,
  },
  accordionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderBottomWidth: 0.5
  },
  accordionTitle: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    color: Typography.Colors.lightblack,
    paddingVertical: 10,
    textAlign: "center",
  },
  accordionIcon: {
    height: 21,
    width: 21,
    // paddingVertical:10,
    justifyContent: "center",
  },
  accordionText: {
    fontFamily: Typography.font.regular,
    fontSize: 14,
    color: Typography.Colors.black,
  },
  specificationName: {
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgrey,
    fontSize: 14,
  },
  specificContainer: {
    justifyContent: "space-between",
    // backgroundColor:'red',
    flex: 1,
  },
  specificationValue: {
    fontFamily: Typography.font.regular,
    fontSize: 14,
    color: Typography.Colors.black,
    paddingVertical: 7,
    // borderBottomWidth:1
  },
  line: {
    height: 1.5,
    width: "70%",
    backgroundColor: "#EAEAEA",
    marginVertical: 7,
  },
  icon: {
    paddingTop: 3,
    paddingLeft: 5,
  },
  icon1: {
    paddingTop: 3,
    paddingRight: 5,
  },
  rating: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    // justifyContent:'center'
  },
  averageRating: {
    fontFamily: Typography.font.medium,
    fontSize: 28,
    color: Typography.Colors.lightblack,
  },
  ratingContainer: {
    paddingHorizontal: 20,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    // backgroundColor:'red'
  },
  Reviews: {
    fontFamily: Typography.font.regular,
    fontSize: 14,
    color: Typography.Colors.black,
    // paddingLeft: 4,
  },
  reviewImage: {
    height: 91,
    width: 95,
    borderRadius: 10,
    marginVertical: 9,
  },
  reviewsComment: {
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightblack,
    fontSize: 14,
    paddingTop: 9,
  },
});
export default ProductDetailPage;
