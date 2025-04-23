import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets } from "../../../assets/images";


const { width } = Dimensions.get("window");

const BannerData = [
{
id: 1,
image: assets.image,
brand: "Forever 21",
event: "Big Fashion Festival",
discount: "70% - 80% off",
},
{
id: 2,
image: assets.image,
brand: "H&M",
event: "Summer Fashion Sale",
discount: "60% - 70% off",
},
{
id: 3,
image: assets.image,
brand: "ZARA",
event: "Winter Fashion Sale",
discount: "70% - 80% off",
},
{
id: 4,
image: assets.image,
brand: "Mango",
event: "Spring Fashion Sale",
discount: "60% - 70% off",
},
{
id: 5,
image: assets.image,
brand: "Puma",
event: "Sports Fashion Sale",
discount: "70% - 80% off",
},
];

const CarouselData = () => {
const renderItem = (item: typeof BannerData[0]) => (
<ImageBackground
source={item.image}
style={styles.imageBackground}
imageStyle={styles.imagestyle}
>
<View style={styles.overlay}>
<Image style={styles.logostyle} source={assets.logo} />
<Text style={styles.text1}>{item.event}</Text>
<Text style={styles.text1}>{item.discount}</Text>
<TouchableOpacity style={styles.button}>
<Text style={styles.buttonText}>Explore</Text>
</TouchableOpacity>
</View>
</ImageBackground>
);

return (
<Carousel
loop
autoPlay
autoPlayInterval={3000}
width={width}
height={344.67}
data={BannerData}
scrollAnimationDuration={1000}
renderItem={({ item }) => renderItem(item)}
/>
);
};

const styles = StyleSheet.create({
imageBackground: {
width: width,
height: 344.67,
justifyContent: "center",
alignItems: "center",
},
imagestyle: {
borderWidth: 0.5,
borderColor: "white",
},
overlay: {
height: "100%",
justifyContent: "center",
alignItems: "center",
gap: 23,
paddingBottom: 25,
},
logostyle: {
width: 175,
height: 29,
},
text1: {
color: "white",
fontSize: 24,
fontWeight: "bold",
textAlign: "center",
},
button: {
backgroundColor: "transparent",
borderColor: "white",
borderWidth: 1,
padding: 5,
borderRadius: 10,
marginTop: 10,
width: 100,
},
buttonText: {
color: "white",
fontSize: 16,
fontWeight: "bold",
alignSelf: "center",
},
});

export default CarouselData;






