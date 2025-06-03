

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import HeaderComponent from "../../components/header/HeaderComponent";
import { assets } from "../../../assets/images";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProductComponent from "../../components/product/ProductComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { Typography } from "../../theme/Colors";
import { Products } from "../../services/api/apiServices";
import useAuthStore from "../../stores/useAuthStore";

// Skeleton Component
const SkeletonPlaceholder = ({ width, height, style }) => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
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
          backgroundColor: '#E1E9EE',
          borderRadius: 4,
        },
        style,
        animatedStyle,
      ]}
    />
  );
};

const ProductsPage = ({ route }) => {
  const themeMode = useAuthStore((state) => state.theme);
  const theme =
    themeMode === "dark"
      ? {
          background: Typography.Colors.black,
          text: Typography.Colors.white,
        }
      : {
          background: Typography.Colors.white,
          text: Typography.Colors.black,
        };
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  };
  const { category, categoryName, categoryId } = route.params;
  const [filterApplied, setFilterApplied] = useState(false);
  const [Category, setCategory] = useState();
  const [filterData, setFilterData] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    Products(categoryName, category.name, categoryId)
      .then((data) => {
        setCategory(data?.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("no data");
        setLoading(false);
      });
  }, []);
  
  const [refresh, setRefresh] = useState(false);
  
  const renderProduct = (data) => {
    return navigation.navigate("ProductDetailPage", { data: data });
  };
  
  const ProductRenderItem = ({ item }) => {
    if (loading) {
      // Skeleton version of ProductComponent
      return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={styles.skeletonProductContainer}>
            <SkeletonPlaceholder width="100%" height={200} style={{ borderRadius: 8 }} />
            <View style={styles.skeletonTextContainer}>
              <SkeletonPlaceholder width="60%" height={16} style={{ marginTop: 8 }} />
              <SkeletonPlaceholder width="80%" height={14} style={{ marginTop: 4 }} />
              <SkeletonPlaceholder width="40%" height={18} style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ProductComponent
          onClick={() => renderProduct(item)}
          images={item.images}
          productName={item.title}
          brandName={item.brand.name}
          initialRate={item.price}
          discount={item.discountPercentage}
          rate={item.discountPrice}
        />
      </View>
    );
  };

  const ListHeader = () => {
    if (loading) {
      // Skeleton version of header
      return (
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <View style={styles.skeletonHeaderContainer}>
            <View style={styles.skeletonHeaderTop}>
              <SkeletonPlaceholder width={24} height={24} />
              <SkeletonPlaceholder width="40%" height={20} style={{ marginLeft: 16 }} />
            </View>
            <View style={styles.skeletonFilterContainer}>
              <SkeletonPlaceholder width={50} height={16} />
              <SkeletonPlaceholder width={17} height={17} style={{ marginLeft: 6 }} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <>
        <HeaderComponent onClick={handleBackButton} Title={category.name} />
        <View style={styles.subContainer}>
          <Pressable
            style={styles.subContainer}
            onPress={() =>
              navigation.navigate("FilterScreen", {
                category: category,
                categoryName: categoryName,
                subCategoryId: category.id,
                categoryId: categoryId,
                setFilterApplied: setFilterApplied,
                setFilterData: setFilterData,
              })
            }
          >
            <Text style={[styles.text, { color: theme.text }]}>Filters</Text>
            <Image source={assets.Filter} style={[styles.SubIcon, { tintColor: theme.text }]} />
          </Pressable>
        </View>
      </>
    );
  };

  // Create skeleton data when loading
  const displayData = loading 
    ? Array.from({ length: 6 }, (_, index) => ({ id: `skeleton-${index}` }))
    : (filterApplied ? filterData?.products : Category);

  return (
    <>
      <FlatList
        data={displayData}
        renderItem={ProductRenderItem}
        onRefresh={() => {
          setFilterApplied(false);
          setRefresh(false);
        }}
        refreshing={refresh}
        keyExtractor={(item) => item.id?.toString()}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={[styles.header, { backgroundColor: theme.background }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Typography.Colors.white,
    paddingTop: 20,
    paddingHorizontal: 14,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white,
  },
  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: Typography.Colors.white,
    borderWidth: 1,
    borderColor: Typography.Colors.primary,
  },
  textStyle: {
    color: Typography.Colors.white,
  },
  product: {
    paddingHorizontal: 20,
  },
  mainContainer: {
    backgroundColor: Typography.Colors.white,
    flex: 1,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
  },
  SubIcon: {
    height: 17,
    width: 17,
  },
  // Skeleton-specific styles
  skeletonProductContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginVertical: 8,
  },
  skeletonTextContainer: {
    paddingVertical: 8,
  },
  skeletonHeaderContainer: {
    paddingBottom: 16,
  },
  skeletonHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});

export default ProductsPage;