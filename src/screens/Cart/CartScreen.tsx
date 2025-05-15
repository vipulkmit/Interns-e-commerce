import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Typography } from "../../theme/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import CustomTextInput from "../../components/textInput/CustomTextInput";
import CustomButton from "../../components/button/CustomButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AddToCart, CartData, CartDelete } from "../../services/api/apiServices";

const CartScreen = () => {
  const navigation = useNavigation();

  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [priceData, setpriceData] = useState({
    subtotal: 0,
    shippingPrice: 0,
    gstAmount: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const isFocus = useIsFocused();
  const [cartToggle, setCartToggle] = useState(false);

  const handleAddToCart  = async (item) => {
    console.log(item,"cvhgtc");
    
    const response = await AddToCart(item.productId,item.quantity).then(() => {
      setCartToggle(!cartToggle);
    });
    //  console.log(response);
  };

  const increment = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 2) - 1,
      }));
    }
  };

  const GetCartData = async () => {
    // setIsLoading(true);
    try {
      const data = await CartData();
      const items = data?.data?.cartDetails?.items || [];

      const initialQuantities = {};
      items.forEach((item) => {
        initialQuantities[item.productId] = 1;
      });

      setCartData(items);
      setQuantities(initialQuantities);
      setIsLoading(false);
    } catch (e) {
      console.log("Error fetching cart data:", e);
      setCartData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetCartData();
  }, [isFocus]);

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
    GetCartPrice();
  }, [isFocus]);

  const deleteitem = async (item) => {
    try {
      const response = await CartDelete(item.productId);
      if (response.data) {
        const newQuantities = { ...quantities };
        setQuantities(newQuantities);
        GetCartData();
        GetCartPrice();
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const handleIncrementQuantity = (item) => {
    // handleAddToCart(item);
    // GetCartData();
    increment(item.productId);
    // GetCartPrice();
  };
  const renderData = ({ item }) => {
    const itemQuantity = quantities[item.productId] || 1;

    return (
      <View style={{ flex: 1 }}>
        <Pressable style={[styles.subContainer]}>
          <View style={styles.imageConatiner}>
            <Image
              source={{ uri: item.productImage[0] }}
              style={styles.Image}
            />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.dataSubConatiner}>
              <View style={styles.innerContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {item?.productName}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  deleteitem(item);
                }}
                style={styles.iconContainer}
              >
                <Icon name="delete" size={18} />
              </Pressable>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceSubContainer}>
                <Text style={styles.price}>Rs. {item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => decrement(item.productId)}
                >
                  <Text style={styles.quantityText}>-</Text>
                </Pressable>
                <View style={[styles.quantity]}>
                  <Text style={[styles.quantityText, { paddingHorizontal: 6 }]}>
                    {itemQuantity}
                  </Text>
                </View>
                <Pressable
                  style={styles.quantityButton}
                  onPress={()=>handleIncrementQuantity(item)}
                >
                  <Text style={styles.quantityText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const EmptyCartView = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Icon
          name="shoppingcart"
          size={80}
          color={Typography.Colors.lightpurple}
        />
        <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
        <Text style={styles.emptyCartText}>
          Looks like you haven't added anything to your cart yet.
        </Text>
      </View>
    );
  };

  const CartContent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      );
    }

    if (!cartData || cartData.length === 0) {
      return <EmptyCartView />;
    }

    return (
      <>
        <FlatList
          data={cartData}
          renderItem={renderData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <View style={styles.priceSubContainer}>
            <CustomTextInput
              placeholder="Enter Coupon Code"
              containerStyle={styles.containerStyle}
            />
          </View>
          <View>
            <CustomButton title="Apply" buttonStyle={styles.button} />
          </View>
        </View>
        <View style={[styles.offers]}>
          <Text style={styles.price}>See Offers</Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Items ({cartData.length})</Text>
            <Text style={styles.perItemAmount}>Rs.{priceData.subtotal}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Shipping</Text>
            <Text style={styles.perItemAmount}>
              Rs.{priceData.shippingPrice}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Promo Code</Text>
            <Text style={styles.perItemAmount}>( - Rs.1234 )</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Import Charges</Text>
            <Text style={styles.perItemAmount}>Rs.{priceData.gstAmount}</Text>
          </View>
          <View style={styles.totalAmount}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.totalPrice}>Rs. {priceData.totalPrice}</Text>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <CustomButton
            title={"Check Out"}
            textStyle={{ fontWeight: "800", fontSize: 18 }}
            onPress={() => navigation.navigate("OrderScreen")}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Your Cart</Text>
      </View>
      <CartContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    paddingHorizontal: 36,
  },
  heading: {
    fontFamily: Typography.font.bold,
    fontWeight: "800",
    fontSize: 22,
    color: Typography.Colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 16,
  },
  Image: {
    height: 77,
    width: 87,
    borderRadius: 5,
  },
  dataContainer: {
    flex: 2,
    paddingVertical: 18,
    paddingRight: 18,
  },
  title: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.black,
    fontSize: 14,
    fontWeight: "800",
  },
  price: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  amount: {
    fontFamily: Typography.font.bold,
    fontWeight: "800",
    color: Typography.Colors.black,
    fontSize: 16,
    paddingTop: 5,
  },
  productAmount: {
    justifyContent: "center",
    gap: 8,
    flex: 1,
    flexDirection: "row",
  },
  subContainer: {
    flexDirection: "row",
    borderWidth: 0.2,
    marginBottom: 16,
    borderRadius: 10,
    marginTop: 4,
  },
  imageConatiner: {
    paddingVertical: 18,
    paddingLeft: 18,
    flex: 1,
  },
  quantityButton: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Typography.Colors.lightpurple,
  },
  quantity: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Typography.Colors.lightpurple,
    backgroundColor: Typography.Colors.lightpurple,
  },
  quantityContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 8,
  },
  innerContainer: {
    flex: 2,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 5,
    gap: 5,
  },
  dataSubConatiner: {
    flex: 1,
    flexDirection: "row",
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  priceSubContainer: {
    flex: 1,
  },
  quantityText: {
    textAlign: "center",
    fontFamily: Typography.font.medium,
    color: Typography.Colors.primary,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  couponSubContainer: {},
  containerStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  offers: {
    alignItems: "flex-end",
    paddingVertical: 15,
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
  totalAmount: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPriceText: {
    fontFamily: Typography.font.bold,
    fontWeight: "700",
    color: Typography.Colors.black,
    fontSize: 18,
  },
  totalPrice: {
    fontFamily: Typography.font.bold,
    fontWeight: "700",
    color: Typography.Colors.nature,
    fontSize: 18,
  },
  // Empty Cart Styles
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyCartTitle: {
    fontFamily: Typography.font.bold,
    fontSize: 24,
    color: Typography.Colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontFamily: Typography.font.medium,
    fontSize: 16,
    color: Typography.Colors.greydark,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  startShoppingButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: Typography.Colors.primary,
    marginTop: 10,
    width: "80%",
  },
  startShoppingText: {
    fontFamily: Typography.font.bold,
    fontSize: 16,
  },
  loadingText: {
    fontFamily: Typography.font.medium,
    fontSize: 16,
    color: Typography.Colors.primary,
  },
});

export default CartScreen;
