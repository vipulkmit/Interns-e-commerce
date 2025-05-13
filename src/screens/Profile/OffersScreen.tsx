import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Typography } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { promocode } from "../../services/api/apiServices";

const PromoCodeScreen = () => {
  const navigation = useNavigation();
  const [promoCodeData, setPromoCodeData] = useState();
  const [loading, setLoading] = useState(true);

  // const handleApplyCode = () => {
  //   console.log("Apply Code");
  // };

  const handleBack = () => {
    navigation.goBack();
  };

  // const fetchPromoCode = async () => {
  //   try {
  //     const response = await axiosInstance.get(ENDPOINTS.PROMOCODE);
  //     setPromoCodeData(response.data);
  //   } catch (error) {
  //     console.error(
  //       "Failed to fetch promo code",
  //       error.response?.data || error
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    <View style={styles.offerContainer}>
      <Text style={styles.codeBox}>{item}</Text>
      <Text style={styles.description}>
        Get extra ₹100 off on orders above ₹999.
      </Text>
      <Text style={styles.expires}>Valid until 31st Jan 2025</Text>
      {item.warning && <Text style={styles.warning}>{item.warning}</Text>}
      {/* <TouchableOpacity onPress={handleApplyCode}>
        <Text style={styles.applyLink}>Apply</Text>
      </TouchableOpacity> */}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Typography.Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Promo Code</Text>
      </View>

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
  header: {
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
});
