import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Typography } from "../../theme/Colors";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { assets } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={assets.ArrowLeft} style={styles.backIcon} />
          </Pressable>
          <Text numberOfLines={1} style={styles.headerTitle}>
            About Us
          </Text>
        </View>
      </>
      {/* <Text style={styles.title}>About Snapshop</Text> */}
      <ScrollView>
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.text}>
          Snapshop is a smart and user-friendly e-commerce mobile application
          built to deliver a smooth, secure, and modern online shopping
          experience. Developed during a 6-month internship at KeyMouseIT Pvt.
          Ltd., the app showcases practical implementation of essential
          e-commerce features in a real-world development environment. It allows
          users to explore products across multiple categories, manage their
          profiles, and shop with ease, all from a single platform.
        </Text>

        <Text style={styles.heading}>Features</Text>
        <Text style={styles.feature}>🛒 Add to Cart & Wishlist:</Text>
        <Text style={styles.text}>
          Seamlessly add items to your cart or save products for later.
        </Text>

        <Text style={styles.feature}>📂 Category & Subcategory Browsing:</Text>
        <Text style={styles.text}>
          Navigate through a wide range of products organized into intuitive
          categories and subcategories.
        </Text>

        <Text style={styles.feature}>🔐 User Authentication:</Text>
        <Text style={styles.text}>
          Secure login, signup, and password recovery functionality.
        </Text>

        <Text style={styles.feature}>👤 Profile Management:</Text>
        <Text style={styles.text}>
          Update your personal information and change your profile picture
          anytime.
        </Text>

        <Text style={styles.feature}>🚚 Delivery Address Control:</Text>
        <Text style={styles.text}>
          Add or modify your delivery address directly from your profile.
        </Text>

        <Text style={styles.feature}>📱 Smooth UI/UX:</Text>
        <Text style={styles.text}>
          Designed with responsiveness in mind, ensuring a smooth experience
          across various screen sizes and devices.
        </Text>

        <Text style={styles.heading}>Purpose & Motto</Text>
        <Text style={styles.text}>
          Snapshop was created as part of our academic semester project with the
          goal of not only learning app development but also understanding
          collaborative development workflows. It taught us the importance of
          version control using Git and how multiple developers contribute to a
          shared codebase using GitHub. We were guided and mentored by our
          senior developer Kusum Negi, whose insights and support played a key
          role in bringing this app to life. More importantly, Snapshop was
          tested and verified by the Quality Assurance team at KeyMouseIT Pvt.
          Ltd., ensuring its reliability and usability before release.
        </Text>

        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>📧 Email:</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:gsaurav641@gmail.com")}
        >
          <Text style={styles.link}>gsaurav641@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:goyalsneha089@gmail.com")}
        >
          <Text style={styles.link}>goyalsneha089@gmail.com</Text>
        </TouchableOpacity>
        <Text style={styles.text}>📞 Phone: +91-7376811531</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Typography.Colors.white,
  },
  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: Typography.Colors.blackdim,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    color: Typography.Colors.darkgrey,
  },
  feature: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    color: Typography.Colors.black,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Typography.Colors.darkgrey,
  },
  link: {
    fontSize: 16,
    color: Typography.Colors.primary,
    marginBottom: 5,
  },
  backIcon: {
    color: Typography.Colors.primary,
    height: 28,
    width: 28,
  },
  headerRow: {
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 13,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
  },
});

export default AboutScreen;
