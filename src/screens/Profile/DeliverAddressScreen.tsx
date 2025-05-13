import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import Iconarrow from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/AntDesign";
import { Typography } from "../../theme/Colors";
import CustomButton from "../../components/button/CustomButton";
import { updateUserdata } from "../../services/api/apiServices";

const DeliveryAddress = () => {
  const user = useAuthStore((state) => state.user);
  const Navigation = useNavigation();

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

  const onDeleteAddress = async (index: number) => {
    // console.log(index, "vsdunfv");
    const updatedAddresses = [...user.address];
    // console.log(updatedAddresses.length, "sdjknsfuj");
    updatedAddresses.splice(index, 1);

    const updatedUser = {
      ...user,
      // id: user.id,
      address: updatedAddresses,
    };
    console.log(user.id, "fdivnfdv");
    const response = await updateUserdata(user.id, updatedAddresses);

    // useAuthStore.getState().setUser(response);

    Alert.alert("Success", "Address has been deleted.", [{ text: "OK" }]);
  };

  console.log(user, "snfi");
  const Listitem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.addressItem}>
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
      </View>
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
      <FlatList
        data={user?.address || []}
        // keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item, index }) => <Listitem item={item} index={index} />}
        ListEmptyComponent={Emptylist}
      />

      <TouchableOpacity>
        <CustomButton
          title={"Add Address"}
          onPress={handleaddAddress}
          buttonStyle={styles.buttonstyleaddress}
          textStyle={styles.buttontextstyleaddress}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Typography.Colors.white,
  },
  arrow: {
    marginTop: 3,
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
    borderWidth: 1,
    borderColor: Typography.Colors.primary,
    borderRadius: 8,
    // backgroundColor: Typography.Colors.darkgrey,
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
    textAlign: "center",
    height: 57,
    width: 167,
    backgroundColor: Typography.Colors.primary,
  },
  buttontextstyleaddress: {
    marginTop: 2,
    color: Typography.Colors.white,
  },
});

export default DeliveryAddress;
