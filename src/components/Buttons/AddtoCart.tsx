import { Image, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import { assets } from "../../../assets/images"



const AddtoCart = () => {
    return(
        <View >
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.textstyle}>Add to Bag</Text>
                <Image source={assets.bag} style={styles.cartIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addToCartButton: {
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#002482",
        borderRadius: 10,
        marginVertical: 5,
        gap:22,
        height: 38,
        width: 180,
    },
    cartIcon: {
        width: 17,
        height: 17,
        marginLeft: 5,
    },
    textstyle:{
        color: "#FFFFFF",
        fontSize: 14,
        // fontWeight: "bold", 
    },
  
})
export default AddtoCart;