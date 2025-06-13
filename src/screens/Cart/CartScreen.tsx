import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { Typography } from "../../theme/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import CustomTextInput from "../../components/textInput/CustomTextInput";
import CustomButton from "../../components/button/CustomButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  AddToCart,
  CartData,
  CartDelete,
  PromoCode,
  QuantityDelete,
} from "../../services/api/apiServices";
import useAuthStore from "../../stores/useAuthStore";
import { assets } from "../../../assets/images";

// Skeleton Components
const SkeletonBox = ({ width, height, style }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: Typography.Colors.lightgrey || "#E0E0E0",
          borderRadius: 5,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const SkeletonCartItem = ({ theme }) => {
  return (
    <View style={[styles.subContainer]}>
      <View style={styles.imageConatiner}>
        <SkeletonBox width={87} height={77} style={undefined} />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataSubConatiner}>
          <View style={styles.innerContainer}>
            <SkeletonBox width="90%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonBox width="70%" height={14} />
          </View>
          <View style={styles.iconContainer}>
            <SkeletonBox width={18} height={18} />
          </View>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceSubContainer}>
            <SkeletonBox width={80} height={16} />
          </View>
          <View
            style={[
              styles.quantityContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <SkeletonBox width={30} height={32} style={{ borderRadius: 5 }} />
            <SkeletonBox
              width={40}
              height={32}
              style={{ marginHorizontal: 2, borderRadius: 5 }}
            />
            <SkeletonBox width={30} height={32} style={{ borderRadius: 5 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

const SkeletonPriceSummary = () => {
  return (
    <View style={{ paddingLeft: 20 }}>
      <View style={styles.amountContainer}>
        <SkeletonBox width={100} height={14} />
        <SkeletonBox width={80} height={14} />
      </View>
      <View style={styles.amountContainer}>
        <SkeletonBox width={60} height={14} />
        <SkeletonBox width={70} height={14} />
      </View>
      <View style={styles.amountContainer}>
        <SkeletonBox width={90} height={14} />
        <SkeletonBox width={85} height={14} />
      </View>
      <View style={styles.amountContainer}>
        <SkeletonBox width={110} height={14} />
        <SkeletonBox width={75} height={14} />
      </View>
      <View style={styles.totalAmount}>
        <SkeletonBox width={100} height={18} />
        <SkeletonBox width={120} height={18} />
      </View>
    </View>
  );
};

const CartScreen = () => {
  const themeMode = useAuthStore((state) => state.theme);
  const isDarkMode = themeMode === "dark";

  // Example of conditionally setting special text color
  const specialTextColor = isDarkMode
    ? Typography.Colors.blue
    : Typography.Colors.primary;

  const theme = {
    background: isDarkMode ? Typography.Colors.black : Typography.Colors.white,
    text: isDarkMode ? Typography.Colors.white : Typography.Colors.black,
    specialText: specialTextColor,
  };
  const { setCart } = useAuthStore();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [cartData, setCartData] = useState([]);
  const [priceData, setpriceData] = useState({
    subtotal: 0,
    shippingPrice: 0,
    gstAmount: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedCart, setHasCheckedCart] = useState(false); // New state to track if we've checked cart initially
  const [coupon, setCoupon] = useState("");
  const [promoData, setPromoData] = useState({ discount: 0 });

  const handleCouponChange = (text) => {
    setCoupon(text);
  };

  const handlePromoCode = async () => {
    if (!coupon.trim()) {
      Alert.alert("Invalid Coupon", "Please enter a valid coupon code");
      return;
    }

    try {
      const response = await PromoCode(coupon);
      setPromoData(response?.data);
      GetCartData();
      GetCartPrice();
    } catch (error) {
      console.log("Error applying promo code:", error);
      Alert.alert("Error", "Failed to apply promo code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get cart data from API
  const GetCartData = async () => {
    // setIsLoading(true);
    try {
      const data = await CartData();
      const items = data?.data?.cartDetails?.items || [];
      setCartData(items);
      setCart(items.length);
      setHasCheckedCart(true); // Mark that we've checked the cart
      setIsLoading(false);
    } catch (e) {
      console.log("Error fetching cart data:", e);
      setCartData([]);
      setHasCheckedCart(true); // Mark that we've checked the cart even on error
      // setIsLoading(false);
    }
  };

  // Get cart price summary
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
      if (data?.data?.cartDetails && coupon) {
        const response = await PromoCode(coupon);
        setPromoData(response?.data);
      }
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

  // Load cart data when screen is focused
  useEffect(() => {
    if (isFocus) {
      GetCartData();
      GetCartPrice();
    }
  }, [isFocus]);

  // Increment quantity handler
  const handleIncrementQuantity = async (item) => {
    try {
      const newQuantity = item.quantity + 1;
      setCartData((prev) =>
        prev.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );

      // Then call API
      await AddToCart(
        item.productId,
        1,
        item.productColorId,
        item.productSizeId
      );

      GetCartPrice();
    } catch (error) {
      console.log("Error updating quantity:", error);
      GetCartData();
    }
  };

  // Delete item from cart
  const deleteQuantity = async (item) => {
    try {
      const response = await QuantityDelete(item.productId);
      if (response.data) {
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const handleDecrementQuantity = async (item) => {
    try {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        setCartData((prev) =>
          prev.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );

        await deleteQuantity(item);
        GetCartPrice();
      } else {
        deleteItem(item);
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
      GetCartData();
    }
  };

  // Delete item from cart
  const deleteItem = async (item) => {
    try {
      const response = await CartDelete(item.productId);
      if (response.data) {
        GetCartData();
        GetCartPrice();
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const renderData = useCallback(
    ({ item }) => {
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
                  <Text
                    style={[styles.title, { color: theme.text }]}
                    numberOfLines={2}
                  >
                    {item?.productName}
                  </Text>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={styles.iconContainer}
                >
                  <Icon name="delete" color={theme.text} size={18} />
                </Pressable>
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceSubContainer}>
                  <Text style={[styles.price, { color: theme.specialText }]}>
                    Rs. {item.price}
                  </Text>
                </View>
                <View
                  style={[
                    styles.quantityContainer,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleDecrementQuantity(item)}
                  >
                    <Text
                      style={[
                        styles.quantityText,
                        { color: theme.specialText },
                      ]}
                    >
                      -
                    </Text>
                  </Pressable>
                  <View style={[styles.quantity]}>
                    <Text
                      style={[styles.quantityText, { paddingHorizontal: 6 }]}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleIncrementQuantity(item)}
                  >
                    <Text
                      style={[
                        styles.quantityText,
                        { color: theme.specialText },
                      ]}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      );
    },
    [cartData]
  );

  const renderSkeletonData = useCallback(
    ({ item }) => {
      return (
        <View style={{ flex: 1 }}>
          <SkeletonCartItem theme={theme} />
        </View>
      );
    },
    [theme]
  );

  const EmptyCartView = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Icon
          name="shoppingcart"
          size={80}
          color={Typography.Colors.greydark}
        />
        <Text style={[styles.emptyCartTitle, { color: theme.specialText }]}>
          Your cart is empty
        </Text>
        <Text style={styles.emptyCartText}>
          Looks like you haven't added anything to your cart yet.
        </Text>
      </View>
    );
  };

  // Create skeleton data array for consistent skeleton count
  const skeletonData = Array.from({ length: 3 }, (_, index) => ({ id: index }));

  // Show skeleton only if loading AND we haven't checked cart yet, OR if we have items in cart
  const shouldShowSkeleton =
    isLoading && (!hasCheckedCart || cartData.length > 0);

  // Show empty cart only if we've checked cart and it's empty and not loading
  const shouldShowEmptyCart =
    hasCheckedCart && !isLoading && (!cartData || cartData.length === 0);

  if (shouldShowSkeleton) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={styles.heading}>Your Cart</Text>
        </View>
        <>
          <FlatList
            data={skeletonData}
            renderItem={renderSkeletonData}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View style={styles.priceSubContainer}>
              <SkeletonBox
                width="100%"
                height={50}
                style={{ borderRadius: 10 }}
              />
            </View>
            <View>
              <SkeletonBox
                width={80}
                height={50}
                style={{ marginLeft: 8, borderRadius: 10 }}
              />
            </View>
          </View>
          <View style={styles.offers}>
            <SkeletonBox width={80} height={16} />
          </View>
          <SkeletonPriceSummary />
          <View style={{ paddingTop: 10, paddingBottom: 20 }}>
            <SkeletonBox
              width="100%"
              height={50}
              style={{ borderRadius: 10 }}
            />
          </View>
        </>
      </View>
    );
  }

  if (shouldShowEmptyCart) {
    return <EmptyCartView />;
  }

  return (
    <ImageBackground source={themeMode === 'dark'? assets.BackgroundDark : assets.Background} style={{flex:1,}} resizeMode="cover">

    <View style={[styles.container ]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.specialText }]}>
          Your Cart
        </Text>
      </View>
      <>
        <FlatList
          data={cartData}
          renderItem={renderData}
          keyExtractor={(item) => item.productId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{backgroundColor:'white'}}
/>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <View style={styles.priceSubContainer}>
            <CustomTextInput
              placeholder="Enter Coupon Code"
              containerStyle={styles.containerStyle}
              value={coupon}
              onChangeText={handleCouponChange}
            />
          </View>
          <View>
            <CustomButton
              title="Apply"
              buttonStyle={styles.button}
              onPress={() => handlePromoCode()}
            />
          </View>
        </View>
        <Pressable
          style={[styles.offers]}
          onPress={() => {
            navigation.navigate("PromoCodeScreen");
          }}
        >
          <Text style={[styles.price, { color: theme.specialText }]}>
            See Offers
          </Text>
        </Pressable>
        <View style={{ paddingLeft: 20 }}>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Items ({cartData?.length})</Text>
            <Text style={[styles.perItemAmount, { color: theme.specialText }]}>
              Rs.{priceData?.subtotal?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Shipping</Text>
            <Text style={[styles.perItemAmount, { color: theme.specialText }]}>
              Rs.{priceData?.shippingPrice}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Promo Code</Text>
            <Text style={[styles.perItemAmount, { color: theme.specialText }]}>
              (- Rs. {promoData?.discount?.toFixed(2)} )
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text1}>Import Charges</Text>
            <Text style={[styles.perItemAmount, { color: theme.specialText }]}>
              Rs.{priceData?.gstAmount?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalAmount}>
            <Text style={[styles.totalPriceText, { color: theme.text }]}>
              Total Price
            </Text>
            <Text style={styles.totalPrice}>
              Rs.{" "}
              {promoData?.updatedCart?.totalPrice
                ? promoData.updatedCart.totalPrice.toFixed(2)
                : priceData.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <CustomButton
            title={"Check Out"}
            textStyle={{ fontWeight: "800", fontSize: 18 }}
            onPress={() => navigation.navigate("DeliveryAddress")}
          />
        </View>
      </>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Typography.Colors.black,
    paddingHorizontal: 36,
    paddingBottom:80
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
    height: 108,
    width: 110,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20
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
    // borderWidth: 0.2,
    marginBottom: 16,
    borderRadius: 10,
    marginTop: 4,
    // elevation:2
  },
  imageConatiner: {
    // paddingVertical: 18,
    // paddingLeft: 18,
    flex: 1,
    // backgroundColor:'red'
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
