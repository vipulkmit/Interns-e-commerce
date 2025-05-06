
import { Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { MainHeaderProps } from "../../models/HomePage.type"
import { assets } from "../../../assets/images"
import { Typography } from "../../theme/Colors"



const HeaderComponent = ({
    id,
    onClick,
    Title,
    productType
}: MainHeaderProps) => {
    // console.log(onClick);

    return (
        <View>
            <View style={styles.container} >
                <View style={styles.UserContainer}>
                    <Pressable onPress={onClick}>
                        <Image source={assets.ArrowLeft} style={styles.backIcon} />
                    </Pressable>
                    <Text numberOfLines={1} style={styles.productType}>{Title} </Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableWithoutFeedback >
                        <Image source={assets.MainSearch} style={styles.icon} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Image source={assets.HeartBlack} style={styles.icon} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Image source={assets.BagBlack} style={styles.icon} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.text}>Filters</Text>
                    <TouchableWithoutFeedback>
                        <Image source={assets.Filter} style={styles.SubIcon} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.text}>Sort By</Text>
                    <TouchableWithoutFeedback>
                        <Image source={assets.DownArray} style={styles.SubIcon} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>

    )

}


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            // paddingHorizontal:5
        },
        subContainer: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingTop: 10,
            paddingRight: 10,
            // backgroundColor:'red'
        },
        productType: {
            fontSize: 18,
            fontFamily: Typography.font.medium,
            color: Typography.Colors.black,
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
            height: 20,
            width: 20,
            color: Typography.Colors.lightblack,
            // backgroundColor:'#272727'
        },
        UserContainer: {
            flex: 2,
            // backgroundColor:'green',
            flexDirection: 'row',
            // alignItems: 'center',
        },
        backIcon: {
            height: 28,
            width: 28
        },
        text: {
            fontSize: 14,
            fontFamily: Typography.font.regular
        },
        SubIcon: {
            height: 17,
            width: 17
        }
    }
)


export default HeaderComponent