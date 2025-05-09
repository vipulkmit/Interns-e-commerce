// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Typography } from "../../theme/Colors";
// import { assets } from "../../../assets/images";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Delete from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons"; // Add this import
// import { WishlistData, WishlistDelete } from "../../services/api/apiServices";
// import CustomButton from "../../components/button/CustomButton";
// import { useIsFocused, useNavigation } from "@react-navigation/native";

// const WishlistScreen = () => {
//   const [Wishlist, setWislist] = useState();
//   const isFocus = useIsFocused();

//   const WishlistApi = async () => {
//     try {
//       const data = await WishlistData();
//       // console.log(data, "dataaaaaa");
//       setWislist(data?.data?.data);
//     } catch (e) {
//       console.log("no data");
//     }
//   };

//   useEffect(() => {
//     WishlistApi();
//   }, [isFocus]);

//   const deleteitem = async (item) => {
//     // console.log(item.id,"vasdjhcfgus u");

//     const response = await WishlistDelete(item.id).then((r) => {
//       if (r.data) {
//         WishlistApi();
//       }
//     });
//   };

//   const wishlistData = ({ item }) => {
//     // console.log(item, "itemmmm");

//     return (
//       <Pressable style={[styles.subContainer]}>
//         <View style={styles.imageConatiner}>
//           <Image source={assets.Collection1} style={styles.Image} />
//         </View>
//         <View style={styles.productAmount}>
//           <Text numberOfLines={2} style={styles.title}>
//             {item.title}
//           </Text>
//           <Text style={styles.brand}>{item.brand.name}</Text>
//         </View>
//         <View style={styles.amountIcon}>
//           <Text style={styles.amount}>Rs. {item.discountPrice}</Text>
//           <Pressable
//             onPress={() => {
//               deleteitem(item);
//             }}
//           >
//             <Delete name="delete" style={styles.icon} size={20} />
//           </Pressable>
//         </View>
//       </Pressable>
//     );
//   };

//   const EmptyWishlist = () => {
//     return (
//       <View style={styles.emptyContainer}>
//         <View style={styles.heartIconContainer}>
//           <Ionicons name="heart" size={64} color={Typography.Colors.primary} />
//         </View>

//         <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
//         <Text style={styles.emptyDescription}>
//           Save items you love to your wishlist to keep track of them and get
//           notified when they go on sale.
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.heading}>Wishlist</Text>
//         <Pressable style={styles.deleteAll}>
//           <Text style={styles.deleteAllText}>Delete All</Text>
//           <Icon name="delete-sweep" size={20} style={{color:Typography.Colors.primary}}/>
//         </Pressable>
//       </View>
//       <FlatList
//         data={Wishlist}
//         renderItem={wishlistData}
//         ListEmptyComponent={EmptyWishlist}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//       {Wishlist && Wishlist.length > 0 && (
//         <View style={styles.buttonContainer}>
//           <CustomButton title="Add All to Cart" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Typography.Colors.white,
//   },
//   heading: {
//     fontFamily: Typography.font.bold,
//     fontWeight: "800",
//     fontSize: 22,
//     color: Typography.Colors.primary,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 45,
//     paddingTop: 55,
//     paddingBottom: 16,
//   },
//   Image: {
//     height: 77,
//     width: 87,
//     borderRadius: 5,
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontFamily: Typography.font.bold,
//     color: Typography.Colors.primary,
//     fontSize: 14,
//     fontWeight: "800",
//   },
//   brand: {
//     fontFamily: Typography.font.bold,
//     color: Typography.Colors.lightgrey,
//     fontSize: 10,
//   },
//   amount: {
//     fontFamily: Typography.font.bold,
//     color: Typography.Colors.black,
//     fontSize: 16,
//     paddingTop: 5,
//   },
//   productAmount: {
//     justifyContent: "center",
//     gap: 8,
//     flex: 1.3,
//   },
//   subContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 30,
//     elevation: 1,
//   },
//   icon: {
//     color: Typography.Colors.black,
//   },
//   imageConatiner: {
//     padding: 18,
//   },
//   amountIcon: {
//     alignItems: "flex-end",
//     flex: 1,
//     justifyContent: "space-between",
//     paddingVertical: 15,
//     paddingRight: 18,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: "#007bff",
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   checked: {
//     backgroundColor: "#007bff",
//   },
//   buttonContainer: {
//     paddingHorizontal: 30,
//     paddingBottom: 20,
//   },

//   // Updated Empty Wishlist Styles
//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     margin: 30,
//     backgroundColor: Typography.Colors.white,
//     elevation: 3,
//   },
//   heartIconContainer: {
//     width: 110,
//     height: 110,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffe5e8",
//     borderRadius: 55,
//     marginBottom: 24,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontFamily: Typography.font.bold,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: Typography.Colors.primary,
//     textAlign: "center",
//   },
//   emptyDescription: {
//     fontSize: 15,
//     fontFamily: Typography.font.regular,
//     color: Typography.Colors.lightgrey,
//     textAlign: "center",
//     lineHeight: 22,
//     marginBottom: 30,
//     paddingHorizontal: 20,
//   },
//   stepsContainer: {
//     flexDirection: "column",
//     width: "100%",
//     marginBottom: 30,
//   },
//   step: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   stepIconContainer: {
//     width: 46,
//     height: 46,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffe5e8",
//     borderRadius: 23,
//     marginRight: 16,
//   },
//   stepTitle: {
//     fontSize: 16,
//     fontFamily: Typography.font.bold,
//     color: Typography.Colors.primary,
//     marginBottom: 4,
//   },
//   stepText: {
//     fontSize: 14,
//     fontFamily: Typography.font.regular,
//     color: Typography.Colors.lightgrey,
//     flex: 1,
//   },
//   startShoppingButton: {
//     flexDirection: "row",
//     backgroundColor: Typography.Colors.primary,
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     width: "80%",
//   },
//   startShoppingText: {
//     color: Typography.Colors.white,
//     fontFamily: Typography.font.bold,
//     fontWeight: "600",
//     fontSize: 16,
//     marginRight: 8,
//   },
//   deleteAll: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     backgroundColor: '#ffe5e8',
//     padding: 10,
//     borderRadius: 10,
//   },
//   deleteAllText: {
//     color:Typography.Colors.primary,
//     fontFamily:Typography.font.heavy
//   },
// });

// export default WishlistScreen;

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Typography } from "../../theme/Colors";
import { assets } from "../../../assets/images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Delete from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons"; // Add this import
import {
  WishlistData,
  WishlistDelete,
  WishlistDeleteAll,
} from "../../services/api/apiServices";
import CustomButton from "../../components/button/CustomButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const WishlistScreen = () => {
  const [Wishlist, setWislist] = useState();
  const isFocus = useIsFocused();

  const WishlistApi = async () => {
    try {
      const data = await WishlistData();
      //   console.log(data, "dataaaaaa");
      setWislist(data?.data?.data);
    } catch (e) {
      console.log("no data");
    }
  };

  useEffect(() => {
    WishlistApi();
  }, [isFocus]);

  const deleteitem = async (item) => {
    // console.log(item.id,"vasdjhcfgus u");

    const response = await WishlistDelete(item.id).then((r) => {
      console.log(r.data);

      if (r.data) {
        WishlistApi();
      }
    });
  };

  const DeleteAll = async () => {
    const response = await WishlistDeleteAll().then((r) => {
      console.log(r.data, "response");

      if (r?.data?.status == 200) {
        // console.log("cfjdvsgjcfs",Wishlist);

        //   WishlistApi();
        setWislist(null);
      }
    });
  };

  const wishlistData = ({ item }) => {
    // console.log(item, "itemmmm");

    return (
      <Pressable style={[styles.subContainer]}>
        <View style={styles.imageConatiner}>
          <Image source={{ uri: item.images[0] }} style={styles.Image} />
        </View>
        <View style={styles.productAmount}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.brand}>{item.brand.name}</Text>
        </View>
        <View style={styles.amountIcon}>
          <Text style={styles.amount}>Rs. {item.discountPrice}</Text>
          <Pressable
            onPress={() => {
              deleteitem(item);
            }}
          >
            <Delete name="delete" style={styles.icon} size={20} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const EmptyWishlist = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.heartIconContainer}>
          <Ionicons name="heart" size={64} color={Typography.Colors.primary} />
        </View>

        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
        <Text style={styles.emptyDescription}>
          Save items you love to your wishlist to keep track of them and get
          notified when they go on sale.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Wishlist</Text>
        {Wishlist && Wishlist.length > 0 && (
          <Pressable style={styles.deleteAll} onPress={DeleteAll}>
            <Text style={styles.deleteAllText}>Delete All</Text>
            <Icon
              name="delete-sweep"
              size={20}
              style={{ color: Typography.Colors.primary }}
            />
          </Pressable>
        )}
      </View>
      <FlatList
        data={Wishlist}
        renderItem={wishlistData}
        ListEmptyComponent={EmptyWishlist}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {Wishlist && Wishlist.length > 0 && (
        <View style={styles.buttonContainer}>
          <CustomButton title="Add All to Cart" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  heading: {
    fontFamily: Typography.font.bold,
    fontWeight: "800",
    fontSize: 22,
    color: Typography.Colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: 55,
    paddingBottom: 16,
  },
  Image: {
    height: 77,
    width: 87,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  brand: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.lightgrey,
    fontSize: 10,
  },
  amount: {
    fontFamily: Typography.font.bold,
    color: Typography.Colors.black,
    fontSize: 16,
    paddingTop: 5,
  },
  productAmount: {
    justifyContent: "center",
    gap: 8,
    flex: 1.3,
  },
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    elevation: 1,
  },
  icon: {
    color: Typography.Colors.black,
  },
  imageConatiner: {
    padding: 18,
  },
  amountIcon: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingRight: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#007bff",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  checked: {
    backgroundColor: "#007bff",
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  // Updated Empty Wishlist Styles
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 30,
    backgroundColor: Typography.Colors.white,
    elevation: 3,
  },
  heartIconContainer: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe5e8",
    borderRadius: 55,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: Typography.font.bold,
    fontWeight: "700",
    marginBottom: 12,
    color: Typography.Colors.primary,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 15,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgrey,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 30,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  stepIconContainer: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe5e8",
    borderRadius: 23,
    marginRight: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    fontFamily: Typography.font.regular,
    color: Typography.Colors.lightgrey,
    flex: 1,
  },
  startShoppingButton: {
    flexDirection: "row",
    backgroundColor: Typography.Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "80%",
  },
  startShoppingText: {
    color: Typography.Colors.white,
    fontFamily: Typography.font.bold,
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
  deleteAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffe5e8",
    padding: 10,
    borderRadius: 10,
  },
  deleteAllText: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.heavy,
  },
});

export default WishlistScreen;
