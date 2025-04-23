import { Text,StyleSheet, View } from "react-native"
import useAuthStore from "../stores/useAuthStore"
import { TouchableOpacity } from "react-native"



export default function LoginScreen() {
    const login = useAuthStore((state) => state.login)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonstyle} onPress={login}>
        <Text style={styles.textstyle}>Let's Go to HomeScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:100,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#002482',
      },
      textstyle: {
        fontSize: 14,
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      buttonstyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#002482',
        justifyContent: 'center',
        alignItems: 'center',
      },
})