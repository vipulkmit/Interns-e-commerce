import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'
import { assets } from '../../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { ProductData } from '../../constant'
import { ProductProps } from '../../models/HomePage.type'
import ProductComponent from '../../components/product/ProductComponent'
import ButtonComponent from '../../components/button/ButtonComponent'
import { Typography } from '../../theme/Colors'


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
          <ButtonComponent icon={assets.WhiteBag} buttonText='Add to Bag' TextStyle={styles.textStyle} buttonStyle={[styles.buttonStyle, { backgroundColor: Typography.Colors.primary }]} />
        </View>
      </View>
    )
  }

const ListHeader=()=>{
  return(
    <HeaderComponent onClick={handleBackButton}  />
  )
}

  return (
        <FlatList
          data={ProductData}
          renderItem={ProductRenderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListHeaderComponentStyle={styles.header}
          // contentContainerStyle={{backgroundColor:'green'}}
        />

  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Typography.Colors.white,
    paddingTop: 20,
    paddingHorizontal: 14
  },
  container: {
    flex: 1,
    paddingHorizontal:20,
    backgroundColor:Typography.Colors.white
  },
  buttonView: {
    flex: 1,
    gap: 13,
    paddingHorizontal: 13,
    flexDirection: 'row'
  },
  buttonStyle: {
    backgroundColor: Typography.Colors.white,
    borderWidth: 1,
    borderColor: Typography.Colors.primary
  },
  textStyle: {
    color: Typography.Colors.white
  },
  product:{
    paddingHorizontal:20
  },
  mainContainer:{
    backgroundColor: Typography.Colors.white,
    flex:1
  }


})
export default HomeScreen1