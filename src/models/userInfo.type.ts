import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native"

export type HeaderProps = {
    userImage: ImageSourcePropType,
    userName: string,
    icon: ImageSourcePropType,
    imgStyle?:StyleProp<ImageStyle>
}