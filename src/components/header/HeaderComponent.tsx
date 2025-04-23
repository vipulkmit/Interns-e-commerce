
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { HeaderProps } from "../../models/userInfo.type"
import { useFonts } from "expo-font";
import { fonts } from "../../../assets/fonts";


const HeaderComponent = ({
    userImage,
    userName,
    icon,
}: HeaderProps) => {
    const font = useFonts({
        'SFPRODISPLAYBLACKITALIC': fonts.SFPRODISPLAYBLACKITALIC,
        'SFPRODISPLAYBOLD': fonts.SFPRODISPLAYBOLD,
        'SFPRODISPLAYHEAVYITALIC': fonts.SFPRODISPLAYHEAVYITALIC,
        'SFPRODISPLAYMEDIUM': fonts.SFPRODISPLAYMEDIUM,
        'SFPRODISPLAYREGULAR': fonts.SFPRODISPLAYREGULAR,
    });
    return (
        <View style={styles.container} >
            <View style={styles.UserContainer}>
                <Image source={userImage} style={styles.userImage} resizeMode='cover' />
                <Text numberOfLines={1} style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableWithoutFeedback >
                    <Image source={icon} style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row'
        },
        userImage: {
            height: 35,
            width: 35
        },
        userName: {
            fontSize: 20,
            fontFamily: 'SFPRODISPLAYMEDIUM'
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end'

        },
        icon: {
            height: 22,
            width: 22,
            color: '#272727'
        },
        UserContainer: {
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7,
            gap:13
        }
    }
)


export default HeaderComponent