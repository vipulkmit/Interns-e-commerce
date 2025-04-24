import { Image, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import { assets } from "../../../assets/images"
import { ButtonProps } from "../../models/homePage.type"




const ButtonComponent=({
    id,
    icon,
    buttonText,
    buttonStyle,
    TextStyle
}: ButtonProps)=>{
    
    return(
        <View >
        <TouchableOpacity style={[styles.button,buttonStyle]}>
            <View style={styles.buttonContainer}>
            <Text style={[styles.textstyle,TextStyle]}>{buttonText}</Text>
            <Image source={icon} style={styles.cartIcon} resizeMode="contain"/>
            </View>
        </TouchableOpacity>
    </View>
    )
}


const styles = StyleSheet.create({
    button: {
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        marginBottom:15,
        borderRadius: 10,
        height: 38,
        width: 180,
    },
    cartIcon: {
        width: 17,
        height: 17,
        marginLeft: 5,
    },
    textstyle:{
        color: "#272727",
        fontSize: 14,
        fontFamily:'SFPRODISPLAYREGULAR'
    },
    buttonContainer:{
        flexDirection:'row',
        gap:20

    }
  
})
export default ButtonComponent;