import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import { assets } from "../../../assets/images";
import { SubCategories } from "../../services/api/apiServices";
import { CategoryProps } from "../../models/HomePage.type";
import { Typography } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const Category = ({ route }) => {
  const { name ,id} = route.params;
  const navigation = useNavigation();

  const renderProductPage = (category) => {
    navigation.navigate("ProductsPage", {
      category: category,
      categoryName: name,
      categoryId:id
    });
  };

  const renderItem = ({ item }: { item: CategoryProps }) => {
    // console.log(item);

    return (
      <Pressable
        style={styles.backgroundContainer}
        onPress={() => renderProductPage(item)}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.subConatiner}
        >
          <Text style={styles.numberText}>{item.name}</Text>
          <View style={styles.overlay} />
        </ImageBackground>
      </Pressable>
    );
  };
  const [Category, setCategory] = useState([]);
  useEffect(() => {
    SubCategories(name)
      .then((data) => {
        setCategory(data?.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const goback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent onClick={goback} Title={name} />

      <Text style={styles.text}>Shop by Category: {name}</Text>
      <FlatList
        data={Category}
        numColumns={2}
        renderItem={renderItem}
        // keyExtractor={(index) => index.toString()}
        contentContainerStyle={{ marginHorizontal: 10 }}
        columnWrapperStyle={{ gap: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Typography.Colors.white,
    flex: 1,
    paddingHorizontal: 5,
  },
  text: {
    fontFamily: Typography.font.heavy,
    fontSize: 25,
    paddingVertical: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  subConatiner: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  dataContainer: {
    paddingLeft: 8,
    paddingBottom: 15,
  },

  numberText: {
    color: Typography.Colors.white,
    fontFamily: Typography.font.bold,
    fontSize: 20,
    position: "absolute",
    zIndex: 99,
  },

  overlay: {
    backgroundColor: Typography.Colors.lightblack,
    opacity: 0.7,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    borderRadius: 10,
  },
  backgroundContainer: {
    flex: 1,
    borderRadius: 30,
    height: 140,
    paddingTop: 15,
    // paddingRight:10
  },
});

export default Category;
