import { ImageSourcePropType } from "react-native"

export type HeaderProps = {
    userImage: ImageSourcePropType,
    userName: string,
    icon: ImageSourcePropType
}

export type BannerProps={
    id: string,
    image: ImageSourcePropType,
    logoImage: ImageSourcePropType,
    brand:string,
    event:string,
    discount:string
}

export type TrendingProps={
    id?: string,
    img: ImageSourcePropType,
    logo: ImageSourcePropType,
    offer:number

}