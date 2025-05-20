import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/images";
import { Typography } from "../../theme/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CartData, Payment } from "../../services/api/apiServices";
import { Button } from "@react-navigation/elements";
import ButtonComponent from "../../components/button/ButtonComponent";
import CustomButton from "../../components/button/CustomButton";

const { width } = Dimensions.get("window");

const OrderScreen = ({ route }) => {
  const { item } = route.params;
  const isFocus = useIsFocused();

  const [cartData, setCartData] = useState([]);
  const [priceData, setpriceData] = useState({
    subtotal: 0,
    shippingPrice: 0,
    gstAmount: 0,
    totalPrice: 0,
  });
  
// console.log(priceData,"priceData");

  const GetCartData = async () => {
    try {
      const data = await CartData();
      const items = data?.data?.cartDetails?.items || [];
      setCartData(items);
    } catch (e) {
      console.log("Error fetching cart data:", e);
      setCartData([]);
    }
  };

  const GetCartPrice = async () => {
    try {
      const data = await CartData();

      setpriceData(
        data?.data?.cartDetails?.breakdown || {
          subtotal: 0,
          shippingPrice: 0,
          gstAmount: 0,
          totalPrice: 0,
        }
      );
    } catch (e) {
      console.log("Error fetching price data:", e);
      setpriceData({
        subtotal: 0,
        shippingPrice: 0,
        gstAmount: 0,
        totalPrice: 0,
      });
    }
  };
  useEffect(() => {
    if (isFocus) {
      GetCartData();
      GetCartPrice();
    }
  }, [isFocus]);
  const navigation = useNavigation();

  const renderData = ({ item }) => {


    return (
      <Pressable style={[styles.CartContainer]}>
        <View style={styles.imageConatiner}>
          <Image source={{ uri: item.productImage[0] }} style={styles.Image} />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.productName}
          </Text>
          <Text style={styles.quantity}>Quantity: {item?.quantity}</Text>
          <Text style={styles.particularPrice}>
            Rs. {item?.price * item?.quantity}
          </Text>
        </View>
      </Pressable>
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  const [paymentToggle, setPaymentToggle] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      const response = await Payment(
        item?.streetAddress,
        item?.city,
        item?.country,
        item?.zipCode
      );
      
      setPaymentToggle(!paymentToggle);
      // console.log("Payment response:", response);
      
      // Check if we have a payment link and redirect to it
      if (response?.data?.paymentLink) {
        // Opening the payment link in the device's browser
        await Linking.openURL(response.data.paymentLink);
      } else {
        Alert.alert("Error", "Payment link not received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Payment Error", "Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={assets.ArrowLeft} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>
      <View style=
      {{flex:0.55}}>
        <FlatList
          data={cartData}
          renderItem={renderData}
          keyExtractor={(item) => item.productId}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: Typography.Colors.lightpurple,
        }}
      />
      <View style={styles.deliveryContainer}>
        <Text style={styles.heading}>Delivery Address</Text>
        <View style={styles.subContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.details} numberOfLines={4}>
              {item?.firstName} {item?.lastName} , {item?.streetAddress}{" "}
              {item?.city}, {item?.state}, {item?.country} {item?.zipCode},{" "}
              {item?.phoneNumber}{" "}
            </Text>
          </View>
          {/* <Pressable style={{ flex: 0.1, justifyContent: "center" }}>
            <Image
              source={assets.rightarrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </Pressable> */}
        </View>
      </View>
      <View style={styles.horizonLine} />
      <View style={styles.deliveryContainer}>
        <Text style={styles.heading}>Payment Method</Text>
        <Pressable style={styles.paymentContainer} >
          <Image source={assets.Razorpay} style={styles.paymentImage} />
          <Text style={styles.details}>Pay With Rozorpay Pay</Text>
          <View style={styles.arrowConatiner}>
            {/* <Image
              source={assets.rightarrow}
              style={styles.arrow}
              resizeMode="contain"
            /> */}
          </View>
        </Pressable>
      </View>
      <View style={styles.horizonLine} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Items (3)</Text>
          <Text style={styles.perItemAmount}>Rs.{priceData.subtotal}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Shipping</Text>
          <Text style={styles.perItemAmount}>Rs.{priceData.shippingPrice}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Promo Code</Text>
          <Text style={styles.perItemAmount}>( - Rs.1234 )</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Import Charges</Text>
          <Text style={styles.perItemAmount}>Rs.{priceData.gstAmount}</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',paddingTop:20,paddingHorizontal:20}} >
        <View style={{flex:1,justifyContent:'center'}}>
        <Text style={{color:Typography.Colors.primary,fontSize:20,fontWeight:'800'}}>Rs. {priceData.totalPrice} </Text>
        </View >
        <View style={{flex:1}}>
        <CustomButton title="Pay Now" onPress={handlePayment} />
        </View >
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    paddingHorizontal: 12,
  },
  subContainer: {
    flexDirection: "row",
  },
  backIcon: {
    height: 28,
    width: 28,
  },
  header: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    gap: 12,
    alignItems: "center",
  },
  headerText: {
    fontFamily: Typography.font.medium,
    fontSize: 20,
    color: Typography.Colors.lightblack,
  },
  track: {
    height: 24,
    width: 24,
    borderRadius: 15,
    backgroundColor: Typography.Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  trackText: {
    color: Typography.Colors.white,
  },
  line: {
    height: 1,
    width: width / 5.2,
    borderColor: Typography.Colors.primary,
    borderBottomWidth: 2,
    paddingVertical: 5.8,
  },
  text: {
    paddingHorizontal: 22,
    justifyContent: "space-between",
  },
  trackerText: {
    fontSize: 12,
    // paddingLeft:8,
    color: Typography.Colors.lightblack,
    fontFamily: Typography.font.regular,
  },
  CartContainer: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor:'pink',
    // marginHorizontal: 36,
    // paddingTop:10,
    // elevation: 1,
    // borderWidth: 0.2,
    // marginBottom: 16,
    borderRadius: 10,
    // marginTop: 10,
    // marginHorizontal: 20,
  },
  imageConatiner: {
    paddingVertical: 18,
    paddingLeft: 18,
    flex: 1,
    // backgroundColor: "red",
  },
  Image: {
    height: 77,
    width: 87,
    borderRadius: 5,
    // paddingHorizontal: 16,
  },
  dataContainer: {
    flex: 2,
    // backgroundColor: "green",
    paddingVertical: 18,
    paddingRight: 18,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 5,
    gap: 5,
  },
  // dataSubConatiner: {
  //   flex: 1,
  //   flexDirection: "row",
  // },
  title: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.black,
    fontSize: 14,
    fontWeight: "800",
  },
  quantity: {
    fontFamily: Typography.font.regular,
    color: Typography.Colors.black,
    fontSize: 14,
    paddingVertical: 8,
  },
  particularPrice: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  deliveryContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  details: {
    fontFamily: Typography.font.medium,
    color: Typography.Colors.lightblack,
    fontSize: 16,
  },
  heading: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.lightblack,
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 10,
  },
  arrow: {
    height: 21,
    width: 21,
  },
  horizonLine: {
    borderBottomWidth: 1,
    borderColor: Typography.Colors.lightpurple,
    paddingVertical: 10,
  },
  paymentImage: {
    height: 27,
    width: 27,
  },
  paymentContainer: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  arrowConatiner: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  text1: {
    fontFamily: Typography.font.medium,
    color: Typography.Colors.greydark,
    fontSize: 14,
  },
  perItemAmount: {
    fontFamily: Typography.font.medium,
    color: Typography.Colors.primary,
    fontSize: 14,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
});
export default OrderScreen;
