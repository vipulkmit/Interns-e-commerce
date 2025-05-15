import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { assets } from "../../../assets/images";
import { Typography } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
// console.log(width);

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={assets.ArrowLeft} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>
      <View style={[styles.subContainer, { paddingHorizontal: 23 }]}>
        <View style={styles.subContainer}>
          <View>
            <View style={styles.track}>
              <Text style={styles.trackText}>1</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.track}>
            <Text style={styles.trackText}>2</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.track}>
            <Text style={styles.trackText}>3</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.track}>
            <Text style={styles.trackText}>4</Text>
          </View>
        </View>
      </View>
      <View style={[styles.subContainer, styles.text]}>
        <Text style={styles.trackerText}>Cart</Text>
        <Text style={[styles.trackerText, { paddingLeft: 10 }]}>Address</Text>
        <Text style={styles.trackerText}>Payment</Text>
        <Text style={styles.trackerText}>Summary</Text>
      </View>
      <Pressable style={[styles.CartContainer]}>
        <View style={styles.imageConatiner}>
          <Image source={assets.Collection1} style={styles.Image} />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={1}>
            vfjfgv hghi ngfsgnnh ibsdvgsn fg,l,kg
          </Text>
          <Text style={styles.quantity}>Quantity: 1</Text>
          <Text style={styles.particularPrice}>Rs. 14566</Text>
        </View>
      </Pressable>
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
              dsbbbbbbbbbbbbbbbbbbbbbfb dejjjjjjjjjjjjjj jhhhhhhhhhhhhhhhf vyhiv
            </Text>
          </View>
          <Pressable style={{ flex: 0.1, justifyContent: "center" }}>
            <Image
              source={assets.rightarrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.horizonLine} />
      <View style={styles.deliveryContainer}>
        <Text style={styles.heading}>Payment Method</Text>
        <Pressable style={styles.paymentContainer}>
          <Image source={assets.Razorpay} style={styles.paymentImage} />
          <Text style={styles.details}>Pay With Rozorpay Pay</Text>
          <View style={styles.arrowConatiner}>
          <Image
              source={assets.rightarrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.horizonLine} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Items (3)</Text>
          <Text style={styles.perItemAmount}>Rs.45620</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Shipping</Text>
          <Text style={styles.perItemAmount}>Rs.45620</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Promo Code</Text>
          <Text style={styles.perItemAmount}>( - Rs.1234 )</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text1}>Import Charges</Text>
          <Text style={styles.perItemAmount}>Rs.45620</Text>
        </View>
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
    paddingVertical: 20,
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
    flexDirection: "row",
    // marginHorizontal: 36,
    // paddingTop:10,
    // elevation: 1,
    // borderWidth: 0.2,
    marginBottom: 16,
    borderRadius: 10,
    marginTop: 30,
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
    fontSize: 14,
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
  paymentContainer:{
    flexDirection:'row',
    gap:20,
    paddingTop:10,
    alignItems:'center'
  },
  arrowConatiner:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    flex:1
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
