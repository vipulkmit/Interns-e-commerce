import { Text, View, StyleSheet, Touchable } from 'react-native'
import React from 'react'
import useAuthStore from '../../stores/useAuthStore'
import { TouchableOpacity } from 'react-native'


const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout)
         return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonstyle}onPress={logout}>
          <Text style={styles.textstyle}>Go Back to LoginScreen</Text>
          </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#002482',
  },
  textstyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  buttonstyle:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#002482',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default HomeScreen
