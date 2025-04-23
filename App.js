import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CarouselData from './src/components/carosule_component/carosuel';
import AddtoCart from './src/components/Buttons/AddtoCart';
import WishlistButton from './src/components/Buttons/wishlistButton';
import TrendingCards from './src/components/Cards/TrendingCards';


export default function App() {
  return (
    <View style={styles.container}>
      <CarouselData />
      <View style={styles.rowContainer}>
        <WishlistButton />
        <AddtoCart />
      </View>
      <TrendingCards />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  }
})