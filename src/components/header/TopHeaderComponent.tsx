
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { HeaderProps } from "../../models/UserInfo.type"
import { Typography } from "../../theme/Colors"



const TopHeaderComponent = ({
    userImage,
    userName,
    icon,
}: HeaderProps) => {
 
    return (
        <View style={styles.container} >
            <View style={styles.UserContainer}>
                <Image source={userImage} style={styles.userImage} resizeMode='contain' />
                <Text numberOfLines={1} style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableWithoutFeedback >
                    <Image source={icon} style={styles.icon} resizeMode="cover"/>
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
            width: 35,
            // backgroundColor:'red'
        },
        userName: {
            fontSize: 20,
            fontFamily: Typography.font.medium
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        icon: {
            height: 22,
            width: 22,
            color: Typography.Colors.lightblack
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


export default TopHeaderComponent