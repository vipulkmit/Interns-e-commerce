import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Typography } from "../../theme/Colors";
import axiosInstance from "../../services/api/axiosInstance";
import { PromoCode, promocode } from "../../services/api/apiServices";
import TopHeaderComponent from "../../components/header/TopHeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../../../assets/images";

const PromoCodeScreen = () => {
  const navigation = useNavigation()
  const [promoCodeData, setPromoCodeData] = useState();
  const [loading, setLoading] = useState(true);

  const [cartToggle, setCartToggle] = useState(false);



  
  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    promocode()
      .then((response) => {
        setPromoCodeData(response.data);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch promo code",
          error.response?.data || error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderOffer = ({ item }) => (
    <View style={styles.offerContainer} >
      <Text selectable={true} style={styles.codeBox}>{item}</Text>
      <Text style={styles.description}>
        Get extra ₹100 off on orders above ₹999.
      </Text>
      <Text style={styles.expires}>Valid until 31st Jan 2025</Text>
      {item.warning && <Text style={styles.warning}>{item.warning}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={assets.ArrowLeft} style={styles.backIcon} />
          </Pressable>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Offers
          </Text>
        </View>
      </>
      <FlatList
        data={promoCodeData || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOffer}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

export default PromoCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    padding: 16,
  },
  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    paddingHorizontal: 20,
  },
  header: {
    gap: 10,
    // backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: Typography.Colors.lightgrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  // applyButton: {
  //   marginLeft: 8,
  //   // backgroundColor: "#000",
  //   paddingHorizontal: 16,
  //   borderRadius: 8,
  //   justifyContent: "center",
  // },
  offerContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    // opacity: 0.4,
    borderColor: Typography.Colors.greydark,
  },
  codeBox: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: Typography.Colors.fadewhite,
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 4,
  },
  description: {
    marginTop: 6,
    fontSize: 14,
  },
  expires: {
    fontSize: 12,
    color: Typography.Colors.red,
    marginTop: 4,
  },
  warning: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
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
