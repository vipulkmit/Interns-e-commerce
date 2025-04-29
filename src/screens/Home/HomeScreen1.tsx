import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'
import { assets } from '../../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { ProductData } from '../../constant'
import { ProductProps } from '../../models/HomePage.type'
import ProductComponent from '../../components/product/ProductComponent'
import ButtonComponent from '../../components/button/ButtonComponent'


const HomeScreen1 = () => {
  const navigation = useNavigation()
  const handleBackButton = () => { navigation.goBack() }

const renderProduct=()=>{
  navigation.navigate('HomeScreen2')
}
  const ProductRenderItem = ({ item }: { item: ProductProps }) => {
    return (
      <View style={styles.container}>
        <ProductComponent onClick={renderProduct} images={item.images} productName={item.productName} brandName={item.brandName} initialRate={item.initialRate} rate={item.rate} discount={item.discount} />
        <View style={styles.buttonView}>
          <ButtonComponent icon={assets.HeartBlack} buttonText='Whislist' buttonStyle={styles.buttonStyle} />
          <ButtonComponent icon={assets.WhiteBag} buttonText='Add to Bag' TextStyle={styles.textStyle} buttonStyle={[styles.buttonStyle, { backgroundColor: '#002482' }]} />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <HeaderComponent back={assets.ArrowLeft} icon={assets.MainSearch} icon1={assets.HeartBlack} icon2={assets.BagBlack} onClick={handleBackButton} />
      </View>
      <View style={styles.product}>
        <FlatList
          data={ProductData}
          renderItem={ProductRenderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 14
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: 'row'
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#002482'
  },
  textStyle: {
    color: "#FFFFFF"
  },
  product:{
    paddingHorizontal:20
  },
  mainContainer:{
    backgroundColor: '#FFFFFF',
    flex:1
  }


})
export default HomeScreen1