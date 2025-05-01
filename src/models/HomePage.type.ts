import { ImageProps, ImageSourcePropType, ImageStyle, StyleProp, TextProps, TextStyle } from "react-native";

export type CategoryProps = {
    id: string;
    image: ImageSourcePropType;
    name: string
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
    img?: ImageSourcePropType,
    logo?: ImageSourcePropType,
    offer?:number,
    productType?:string,
    amount?: number,
    productImgStyle?:StyleProp<ImageStyle>,
    staticContainer?:StyleProp<ImageStyle>
}


export type ProductProps = {
    id?: string,
    images?: ImageSourcePropType[],
    productName?: string,
    brandName?: string,
    initialRate?: number,
    rate?: number,
    discount?: string,
    onClick:()=> void,
}


export type ButtonProps={
    id?:string,
    icon:ImageSourcePropType,
    buttonText?:string,
    buttonStyle?:StyleProp<ImageStyle>,
    TextStyle?:StyleProp<ImageStyle>
}

export type MainHeaderProps={
    id?:string,
    productType?:string,
    onClick:()=> void,
    Title?:string
    // back:ImageSourcePropType,
    // icon:ImageSourcePropType,
    // icon1:ImageSourcePropType,
    // icon2:ImageSourcePropType,
}