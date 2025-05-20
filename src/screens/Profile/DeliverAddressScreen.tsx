import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import Iconarrow from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/AntDesign";
import { Typography } from "../../theme/Colors";
import CustomButton from "../../components/button/CustomButton";
import { updateUserdata } from "../../services/api/apiServices";

import { useState } from "react";
import TopHeaderComponent from "../../components/header/TopHeaderComponent";
import { assets } from "../../../assets/images";

const DeliveryAddress = () => {
  const user = useAuthStore((state) => state.user);
  const Navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onAddAddress = () => {
    Navigation.navigate("AddAddressList");
  };

  const onEditAddress = (address: any, index: number) => {
    Navigation.navigate("AddAddressList", { address: address, index: index });
  };

  const handlearrowbutton = () => {
    Navigation.goBack();
  };

  const handleaddAddress = () => {
    Navigation.navigate("AddAddressList");
  };

  const handlebutton = () => {
    return (
      <>
        {user?.address && user?.address?.length > 0 && (
          <CustomButton
            title={"Add Address"}
            onPress={handleaddAddress}
            buttonStyle={styles.buttonstyleaddress}
            textStyle={styles.buttontextstyleaddress}
          />
        )}
      </>
    );
  };

  const onDeleteAddress = async (index: number) => {
    const updatedAddresses = [...user.address];
    updatedAddresses.splice(index, 1);
    const updatedUser = {
      ...user,
      address: updatedAddresses,
    };
    const response = await updateUserdata(user.id, updatedUser);

    Alert.alert("Success", "Address has been deleted.", [{ text: "OK" }]);
  };

  const AddressNavigate = (item, index) => {
    setSelectedIndex(index);
    Navigation.navigate("OrderScreen", { item: item });
  };
  // console.log(user, "snfi");
  const Listitem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => AddressNavigate(item, index)}
        style={[
          styles.addressItem,
          {
            borderColor:
              selectedIndex === index
                ? Typography.Colors.primary
                : Typography.Colors.black,
            borderWidth: selectedIndex === index ? 2 : 1,
          },
        ]}
      >
        <View style={styles.addressHeader}>
          <Text style={styles.addressText}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
        <Text style={styles.addressText}>{item.streetAddress}</Text>
        <Text style={styles.addressText}>
          {item.city}, {item.state}, {item.zipCode}
        </Text>
        <Text style={styles.addressText}>{item.country}</Text>
        <Text style={styles.addressText}>Phone: {item.phoneNumber}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => onEditAddress(item, index)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteAddress(index)}>
            <Icon size={20} color={Typography.Colors.black} name="delete" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const Emptylist = () => {
    return (
      <>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={handlearrowbutton}>
            <Iconarrow
              size={35}
              color={Typography.Colors.black}
              style={styles.arrow}
              name="arrow-left"
            />
          </TouchableOpacity>
          <Text style={styles.addressText}>Delivery Address</Text>
        </View>
        <View style={styles.AddressContainer}>
          <Text style={styles.title}>🚚 No Delivery Address Found</Text>
          <Text style={styles.message}>
            Looks like we don’t have a delivery address for you yet.{"\n"}
            Please add one to make sure your orders arrive at the right place.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onAddAddress}>
            <Icon size={25} color={Typography.Colors.white} name="plus" />
            <Text style={styles.buttonText}>Add Delivery Address</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => Navigation.goBack()}>
          <Image source={assets.ArrowLeft} style={styles.backIcon} />
        </Pressable>
        <Text numberOfLines={1} style={styles.headerTitle}>
          Choose Delivery Address
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        data={user?.address || []}
        renderItem={({ item, index }) => <Listitem item={item} index={index} />}
        ListEmptyComponent={Emptylist}
        ListFooterComponent={handlebutton}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Typography.Colors.white,
  },
  containerm: {
    backgroundColor: Typography.Colors.white,
  },
  arrow: {
    marginTop: 3,
  },
  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    marginBottom: 10,
    // paddingHorizontal: 20,
  },
  UserContainer: {
    flex: 2,
    flexDirection: "row",
  },
  backIcon: {
    color: Typography.Colors.primary,
    height: 28,
    width: 28,
  },
  productType: {
    fontSize: 18,
    fontFamily: Typography.font.medium,
    color: Typography.Colors.black,
    paddingLeft: 13,
  },
  mainContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  addressText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Typography.font.bold,
    color: Typography.Colors.darkgrey,
  },
  AddressContainer: {
    marginTop: "50%",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Typography.Colors.black,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Typography.Colors.greydark,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  button: {
    flexDirection: "row",
    marginTop: 24,
    backgroundColor: Typography.Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 10,
  },
  buttonText: {
    marginTop: 1,
    textAlign: "center",
    color: Typography.Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  addressItem: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: Typography.Colors.primary,
    borderRadius: 8,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  editText: {
    color: Typography.Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonstyleaddress: {
    alignSelf: "center",
    textAlign: "center",
    height: 57,
    width: 267,
    backgroundColor: Typography.Colors.primary,
  },
  buttontextstyleaddress: {
    marginTop: 2,
    color: Typography.Colors.white,
  },
  headerRow: {
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

export default DeliveryAddress;
