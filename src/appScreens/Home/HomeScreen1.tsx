import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Categories from '../../components/categories/Categories'
import Product from '../../components/product/Product'

export class HomeScreen1 extends Component {
  render() {
    return (
      <View >
        <Categories />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Product />
        </View>
      </View>
    )
  }
}

export default HomeScreen1