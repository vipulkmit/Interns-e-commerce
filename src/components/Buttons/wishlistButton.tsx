import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native"
import { assets } from "../../../assets/images"



const WishlistButton = () => {
    return (
        <View>
            <TouchableOpacity style={styles.wishlistButtonstyle}>
                <Text style={styles.textstyle}>Wishlist</Text>
                <Image source={assets.heart} style={styles.heartIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wishlistButtonstyle: {
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        marginVertical:5,
        borderRadius: 10,
        borderWidth: 1,
        gap:22,
        borderColor: "#002482",
        height:38,
        width:180
    },
    heartIcon: {
        
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    textstyle:{
        
        fontSize: 14,

    }
})

export default WishlistButton;