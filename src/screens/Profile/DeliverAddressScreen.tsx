// import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
// import { Typography } from "../../theme/Colors";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Entypo";
// import Iconarrow from "react-native-vector-icons/MaterialCommunityIcons";
// import { useState } from "react";
// import useAuthStore from "../../stores/useAuthStore";

// const DeliveryAddress = () => {
//   const { setUser } = useAuthStore();
//   const user = useAuthStore((state) => state.user);

//   const Listitem = (user) => {
//     return (
//       <View style={styles.addressItem}>
//         <Text style={styles.addressText}>
//           {user.address.firstName} {user.lastName}
//         </Text>
//         <Text style={styles.addressText}>{user.streetAddress}</Text>
//         <Text style={styles.addressText}>
//           {user.city}, {user.state}, {user.zipCode}
//         </Text>
//         <Text style={styles.addressText}>{user.country}</Text>
//         <Text style={styles.addressText}>Phone: {user.phoneNumber}</Text>
//       </View>
//     );
//   };

//   const Emptylist = () => {
//     return (
//       <>
//         <View style={styles.mainContainer}>
//           <TouchableOpacity onPress={handlearrowbutton}>
//             <Iconarrow
//               size={35}
//               color={Typography.Colors.black}
//               style={styles.arrow}
//               name="arrow-left"
//             />
//           </TouchableOpacity>
//           <Text style={styles.addressText}>Add Address Method</Text>
//         </View>
//         <View style={styles.AddressContainer}>
//           <Text style={styles.title}>🚚 No Delivery Address Found</Text>
//           <Text style={styles.message}>
//             Looks like we don’t have a delivery address for you yet.{"\n"}
//             Please add one to make sure your orders arrive at the right place.
//           </Text>
//           <TouchableOpacity style={styles.button} onPress={onAddAddress}>
//             <Icon size={25} color={Typography.Colors.white} name="plus" />
//             <Text style={styles.buttonText}>Add Delivery Address</Text>
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   };

//   const Navigation = useNavigation();

//   const onAddAddress = () => {
//     Navigation.navigate("AddAddressList");
//   };

//   const handlearrowbutton = () => {
//     Navigation.goBack();
//   };
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={user}
//         keyExtractor={(user) => user.id.toString()}
//         renderItem={({ item }) => <Listitem item={item} />}
//         ListEmptyComponent={Emptylist}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: Typography.Colors.white,
//   },
//   arrow: {
//     marginTop: 3,
//   },
//   mainContainer: {
//     marginTop: 10,
//     alignSelf: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 20,
//   },
//   addressText: {
//     fontSize: 18,
//     fontWeight: "700",
//     fontFamily: Typography.font.bold,
//   },
//   AddressContainer: {
//     marginTop: "50%",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "600",
//     marginTop: 16,
//     color: Typography.Colors.black,
//     textAlign: "center",
//   },
//   message: {
//     fontSize: 16,
//     color: Typography.Colors.greydark,
//     textAlign: "center",
//     marginTop: 12,
//     lineHeight: 22,
//   },
//   button: {
//     flexDirection: "row",
//     marginTop: 24,
//     backgroundColor: Typography.Colors.primary,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     gap: 10,
//   },
//   buttonText: {
//     marginTop: 1,
//     textAlign: "center",
//     color: Typography.Colors.white,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   addressItem: {
//     marginBottom: 12,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: Typography.Colors.primary,
//     borderRadius: 8,
//     backgroundColor: Typography.Colors.lightGray,
//   },
// });

// export default DeliveryAddress;

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import Iconarrow from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Feather";
import { Typography } from "../../theme/Colors";

const DeliveryAddress = () => {
  const user = useAuthStore((state) => state.user);
  const Navigation = useNavigation();

  const onAddAddress = () => {
    Navigation.navigate("AddAddressList");
  };

  const onEditAddress = (address: any, index: number) => {
    Navigation.navigate("AddAddressList", { address, index });
  };

  const handlearrowbutton = () => {
    Navigation.goBack();
  };

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
        <TouchableOpacity onPress={() => onEditAddress(item, index)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
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
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => <Listitem item={item} index={index} />}
        ListEmptyComponent={Emptylist}
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
    backgroundColor: Typography.Colors.lightGray,
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
});

export default DeliveryAddress;
