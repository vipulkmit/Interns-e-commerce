
import { Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { MainHeaderProps } from "../../models/homePage.type"
import { assets } from "../../../assets/images"



const HeaderComponent = ({
    id,
    back,
    icon,
    icon1,
    icon2,
    onClick,
    productType
}: MainHeaderProps) => {
// console.log(onClick);

    return (
        <>
            <View style={styles.container} >
                <View style={styles.UserContainer}>
                    <Pressable onPress={onClick}>
                        <Image source={back} style={styles.backIcon}  />
                    </Pressable>
                    {/* <Text numberOfLines={1} style={styles.productType}>Tops </Text> */}
                </View>
                <View style={styles.iconContainer}>
                    <TouchableWithoutFeedback >
                        <Image source={icon} style={styles.icon} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Image source={icon1} style={styles.icon} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Image source={icon2} style={styles.icon} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.text}>Sort By</Text>
                <TouchableWithoutFeedback>
                    <Image source={assets.DownArray} style={styles.SubIcon}/>
                </TouchableWithoutFeedback>
            </View>
        </>
    )

}


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row'
        },
        subContainer:{
            flexDirection:'row',
            alignItems:'flex-end',
            justifyContent:'flex-end',
            paddingTop:15,
            paddingRight:10
        },
        productType: {
            fontSize: 20,
            fontFamily: 'SFPRODISPLAYMEDIUM',
            color: '#000000',
            paddingLeft: 13,
            // alignSelf:'center'
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor:'red'
        },
        icon: {
            height: 24,
            width: 24,
            color: '#272727',
            // backgroundColor:'#272727'
        },
        UserContainer: {
            flex: 2,
            // backgroundColor:'green',
            flexDirection: 'row',
            // alignItems: 'center',
        },
        backIcon: {
            height: 32,
            width: 32
        },
        text:{
            fontSize:14,
            fontFamily:'SFPRODISPLAYREGULAR'
        },
        SubIcon:{
            height:17,
            width:17
        }
    }
)


export default HeaderComponent