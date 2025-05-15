
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import React from "react";
import { Typography } from "../../theme/Colors";
import { BannerData } from "../../constant";
import { BannerProps } from "../../models/HomePage.type";

const { width } = Dimensions.get('window');
const numColumns = 4;
const itemWidth = (width - 60) / numColumns;

const SearchScreen = () => {
  const renderItem = ({ item }: { item: BannerProps }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.Images} />
        <Text numberOfLines={1} style={styles.typeofCategory}>
          {item.brand}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Men's Fashion</Text>
        <FlatList 
          data={BannerData}
          renderItem={renderItem}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    padding: 30,
  },
  subContainer: {
    flex: 1,
  },
  title: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.bold,
    fontSize: 16,
    paddingVertical: 15,
  },
  heading: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.bold,
    fontWeight: "800",
    fontSize: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    width: itemWidth,
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: 'rgba(240, 240, 240, 0.5)', // Light gray for testing
  },
  Images: {
    height: 70,
    width: 70,
    borderRadius: 35, // Half of width/height for perfect circle
  },
  typeofCategory: {
    color: Typography.Colors.lightblack,
    fontFamily: Typography.font.medium,
    fontSize: 14,
    paddingTop: 7,
    textAlign: 'center',
    maxWidth: itemWidth - 10, // Leave some margin
  },
});

export default SearchScreen;