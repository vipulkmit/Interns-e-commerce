import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'
import { assets } from '../../../assets/images'
import { useNavigation } from '@react-navigation/native'
import ProductComponent from '../../components/product/ProductComponent'
import ButtonComponent from '../../components/button/ButtonComponent'
import { Typography } from '../../theme/Colors'
import { Products } from '../../services/api/apiServices'


const ProductsPage = ({ route }) => {
  const navigation = useNavigation()
  const handleBackButton = () => { navigation.goBack() }
  const { category, categoryName } = route.params;


  const [Category, setCategory] = useState();

  useEffect(() => {
    Products(categoryName, category.name).
      then(data => {
        setCategory(data?.data)
      }).
      catch((e) => {
        console.log('no data');
      })
  }, [])
  // console.log(item,'categhorebgheru');

  const renderProduct = (data) => {
    // console.log(data, "item");

    return (
      navigation.navigate('ProductDetailPage',{data:data}))
  }
  const ProductRenderItem = ({ item }) => {

    return (
      <View style={styles.container}>
        <ProductComponent onClick={() => renderProduct(item)} images={item.images} productName={item.title} brandName={item.brand.name} initialRate={item.price} discount={item.discountPercentage} rate={item.discountPrice} />
        <View style={styles.buttonView}>
          <ButtonComponent icon={assets.HeartBlack} buttonText='Whislist' buttonStyle={styles.buttonStyle} />
          <ButtonComponent icon={assets.WhiteBag} buttonText='Add to Bag' TextStyle={styles.textStyle} buttonStyle={[styles.buttonStyle, { backgroundColor: Typography.Colors.primary }]} />
        </View>
      </View>
    )
  }

  const ListHeader = () => {
    return (
      <HeaderComponent onClick={handleBackButton} Title={category.name} />
    )
  }

  return (
    <FlatList
      data={Category}
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
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white
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
  product: {
    paddingHorizontal: 20
  },
  mainContainer: {
    backgroundColor: Typography.Colors.white,
    flex: 1
  }
})
export default ProductsPage