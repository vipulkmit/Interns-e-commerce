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
import HeaderComponent from "../../components/header/HeaderComponent";
import { assets } from "../../../assets/images";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProductComponent from "../../components/product/ProductComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { Typography } from "../../theme/Colors";
import { Products } from "../../services/api/apiServices";

const ProductsPage = ({ route }) => {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  };
  const { category, categoryName ,categoryId} = route.params;
  const [filterApplied, setFilterApplied] = useState(false);
  const [Category, setCategory] = useState();
  const [filterData, setFilterData] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
// console.log(category.id,"categoryyyyyyy");
// console.log(categoryId,"categoryIdcategoryIdcategoryIdcategoryId");


console.log(filterData,'ffilter=-=-=--=--')
  useEffect(() => {
    Products(categoryName, category.name,categoryId)
      .then((data) => {
        console.log(data?.data,'da6ta')
        setCategory(data?.data);
      })
      .catch((e) => {
        console.log("no data");
      });
  }, []);
  const [refresh, setRefresh] = useState(false);
  const renderProduct = (data) => {
    // console.log(data, "item");

    return navigation.navigate("ProductDetailPage", { data: data });
  };
  const ProductRenderItem = ({ item }) => {
    return (
      <View style={styles.container}>
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
                categoryId:categoryId,
                setFilterApplied: setFilterApplied,
                setFilterData: setFilterData,
              })
            }
          >
            <Text style={styles.text}>Filters</Text>
            <Image source={assets.Filter} style={styles.SubIcon} />
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={filterApplied ? filterData?.products : Category}
        renderItem={ProductRenderItem}
        onRefresh={() => {
          setFilterApplied(false);
          setRefresh(false);
        }}
        refreshing={refresh}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={styles.header}
        // contentContainerStyle={{backgroundColor:'green'}}
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
    // backgroundColor:'red'
  },
  text: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
  },
  SubIcon: {
    height: 17,
    width: 17,
  },
});
export default ProductsPage;
