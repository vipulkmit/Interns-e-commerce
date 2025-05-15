import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Typography } from "../../theme/Colors";
import { BannerProps } from "../../models/HomePage.type";
import CustomTextInput from "../../components/textInput/CustomTextInput";
import { SubCategories } from "../../services/api/apiServices";

const { width } = Dimensions.get("window");
const numColumns = 4;
const itemWidth = (width - 60) / numColumns;

const categoryKeys = [
  { key: "men", title: "Men's Fashion" },
  { key: "women", title: "Women's Fashion" },
  { key: "kids", title: "Kids Fashion" },
  { key: "western wear", title: "Western Fashion" },
  { key: "traditional wear", title: "Traditional Fashion" },
];

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [sections, setSections] = useState<
    { title: string; data: BannerProps[][] }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(
        categoryKeys.map((cat) => SubCategories(cat.key))
      );

      const formatted = results.map((res, index) => {
        const categoryData = res?.data || [];
        return {
          title: categoryKeys[index].title,
          data: formatData(categoryData, numColumns),
        };
      });

      setSections(formatted);
    } catch (error) {
      console.log("Error loading categories", error);
    } finally {
      setLoading(false);
    }
  };

  const formatData = (data: BannerProps[], numColumns: number) => {
    const rows = [];
    const fullRows = Math.floor(data.length / numColumns);
    for (let i = 0; i < fullRows * numColumns; i += numColumns) {
      rows.push(data.slice(i, i + numColumns));
    }
    const remaining = data.length % numColumns;
    if (remaining > 0) {
      const lastRow = data.slice(-remaining);
      while (lastRow.length < numColumns) {
        lastRow.push({ id: `blank-${lastRow.length}`, empty: true } as any);
      }
      rows.push(lastRow);
    }
    return rows;
  };

  const renderItem = ({ item }: { item: BannerProps[] }) => (
    <View style={styles.row}>
      {item.map((subItem, index) =>
        subItem.empty ? (
          <View
            key={index}
            style={[styles.itemContainer, { backgroundColor: "transparent" }]}
          />
        ) : (
          <View key={subItem.id} style={styles.itemContainer}>
            <Image
              source={{ uri: subItem.image }}
              style={styles.Images}
              resizeMode="cover"
            />
            <Text numberOfLines={1} style={styles.typeofCategory}>
              {subItem.name}
            </Text>
          </View>
        )
      )}
    </View>
  );

  const renderHeader = () => (
    <>
      <Text style={styles.heading}>Search</Text>
      <CustomTextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        keyboardType="default"
        iconname="search"
        iconsize={25}
        iconcolor={Typography.Colors.black}
        containerStyle={styles.searchstyle}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Typography.Colors.primary} />
      ) : (
        <FlatList
          data={sections}
          ListHeaderComponent={renderHeader}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <Text style={styles.title}>{item.title}</Text>
              <FlatList
                data={item.data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
            </>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Typography.Colors.white,
    padding: 30,
  },
  heading: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.bold,
    fontWeight: "800",
    fontSize: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.bold,
    fontSize: 16,
    paddingVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemContainer: {
    width: itemWidth,
    alignItems: "center",
    paddingVertical: 10,
  },
  Images: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  typeofCategory: {
    color: Typography.Colors.lightblack,
    fontFamily: Typography.font.medium,
    fontSize: 14,
    paddingTop: 7,
    textAlign: "center",
    maxWidth: itemWidth - 10,
  },
  searchstyle: {
    backgroundColor: Typography.Colors.grayy,
    borderRadius: 15,
    height: 55.5,
    width: width - 60,
  },
});

export default SearchScreen;

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   SectionList,
//   Dimensions,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Typography } from "../../theme/Colors";
// import {
//   BannerData,
//   BannerData1,
//   BannerData2,
//   BannerData3,
//   BannerData4,
// } from "../../constant";
// import { BannerProps } from "../../models/HomePage.type";
// import CustomTextInput from "../../components/textInput/CustomTextInput";
// // import { SubCategories } from "../../services/api/apiServices";

// const { width } = Dimensions.get("window");
// const numColumns = 4;
// const itemWidth = (width - 60) / numColumns;

// const sections = [
//   { title: "Men's Fashion", data: BannerData },
//   { title: "Women's Fashion", data: BannerData1 },
//   { title: "Kids Fashion", data: BannerData2 },
//   { title: "Western Fashion", data: BannerData3 },
//   { title: "Traditional Fashion", data: BannerData4 },
// ];

// const SearchScreen = () => {
//   const [search, setsearch] = useState<string>("");

//   const formatData = (data: BannerProps[], numColumns: number) => {
//     const numberOfFullRows = Math.floor(data.length / numColumns);
//     let rows = [];

//     for (let i = 0; i < numberOfFullRows * numColumns; i += numColumns) {
//       rows.push(data.slice(i, i + numColumns));
//     }

//     const remainingItems = data.length % numColumns;
//     if (remainingItems > 0) {
//       const lastRow = data.slice(-remainingItems);
//       while (lastRow.length < numColumns) {
//         lastRow.push({ id: `blank-${lastRow.length}`, empty: true } as any);
//       }
//       rows.push(lastRow);
//     }

//     return rows;
//   };

//   const handleSearchScreen = () => {
//     return (
//       <>
//         <Text style={styles.heading}>Search</Text>
//         <CustomTextInput
//           value={search}
//           onChangeText={setsearch}
//           placeholder="Search..."
//           keyboardType="default"
//           iconname="search"
//           iconsize={25}
//           iconcolor={Typography.Colors.black}
//           containerStyle={styles.searchstyle}
//         />
//       </>
//     );
//   };

//   const renderItem = ({ item }: { item: BannerProps[] }) => (
//     <View style={styles.row}>
//       {item.map((subItem, index) =>
//         subItem.empty ? (
//           <View
//             key={index}
//             style={[styles.itemContainer, { backgroundColor: "transparent" }]}
//           />
//         ) : (
//           <View key={subItem.id} style={styles.itemContainer}>
//             <Image source={subItem.image} style={styles.Images} />
//             <Text numberOfLines={1} style={styles.typeofCategory}>
//               {subItem.brand}
//             </Text>
//           </View>
//         )
//       )}
//     </View>
//   );

//   const renderSectionHeader = ({
//     section: { title },
//   }: {
//     section: { title: string };
//   }) => <Text style={styles.title}>{title}</Text>;

//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={sections.map((s) => ({
//           title: s.title,
//           data: formatData(s.data, numColumns),
//         }))}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         renderSectionHeader={renderSectionHeader}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         ListHeaderComponent={handleSearchScreen}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Typography.Colors.white,
//     padding: 30,
//   },
//   heading: {
//     color: Typography.Colors.primary,
//     fontFamily: Typography.font.bold,
//     fontWeight: "800",
//     fontSize: 24,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   title: {
//     color: Typography.Colors.primary,
//     fontFamily: Typography.font.bold,
//     fontSize: 16,
//     paddingVertical: 15,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   itemContainer: {
//     width: itemWidth,
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   Images: {
//     height: 70,
//     width: 70,
//     borderRadius: 35,
//   },
//   typeofCategory: {
//     color: Typography.Colors.lightblack,
//     fontFamily: Typography.font.medium,
//     fontSize: 14,
//     paddingTop: 7,
//     textAlign: "center",
//     maxWidth: itemWidth - 10,
//   },
//   searchstyle: {
//     backgroundColor: Typography.Colors.grayy,
//     borderRadius: 15,
//     height: 55.5,
//     width: width - 60,
//   },
// });

// export default SearchScreen;

// const { width } = Dimensions.get("window");
// const numColumns = 4;
// const itemWidth = (width - 60) / numColumns;

// const SearchScreen = () => {
//   const [search, setSearch] = useState<string>("");
//   const [categories, setCategories] = useState<BannerProps[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await SubCategories("men");
//       setCategories(res?.data || []);
//     } catch (error: any) {
//       console.log("Error fetching categories:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const formatData = (data: BannerProps[], numColumns: number) => {
//     const numberOfFullRows = Math.floor(data.length / numColumns);
//     let rows: BannerProps[][] = [];

//     for (let i = 0; i < numberOfFullRows * numColumns; i += numColumns) {
//       rows.push(data.slice(i, i + numColumns));
//     }

//     const remainingItems = data.length % numColumns;
//     if (remainingItems > 0) {
//       const lastRow = data.slice(-remainingItems);
//       while (lastRow.length < numColumns) {
//         lastRow.push({ id: `blank-${lastRow.length}`, empty: true } as any);
//       }
//       rows.push(lastRow);
//     }

//     return rows;
//   };

//   const renderItem = ({ item }: { item: BannerProps[] }) => (
//     <View style={styles.row}>
//       {item.map((subItem, index) =>
//         subItem.empty ? (
//           <View
//             key={index}
//             style={[styles.itemContainer, { backgroundColor: "transparent" }]}
//           />
//         ) : (
//           <View key={subItem.id} style={styles.itemContainer}>
//             <Image
//               source={{ uri: subItem.image }}
//               style={styles.Images}
//               resizeMode="cover"
//             />
//             <Text numberOfLines={1} style={styles.typeofCategory}>
//               {subItem.name}
//             </Text>
//           </View>
//         )
//       )}
//     </View>
//   );

//   const renderHeader = () => (
//     <>
//       <Text style={styles.heading}>Search</Text>
//       <CustomTextInput
//         value={search}
//         onChangeText={setSearch}
//         placeholder="Search..."
//         keyboardType="default"
//         iconname="search"
//         iconsize={25}
//         iconcolor={Typography.Colors.black}
//         containerStyle={styles.searchstyle}
//       />
//     </>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color={Typography.Colors.primary} />
//       ) : (
//         <FlatList
//           data={formatData(categories, numColumns)}
//           renderItem={renderItem}
//           keyExtractor={(_, index) => index.toString()}
//           ListHeaderComponent={renderHeader}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Typography.Colors.white,
//     padding: 30,
//   },
//   heading: {
//     color: Typography.Colors.primary,
//     fontFamily: Typography.font.bold,
//     fontWeight: "800",
//     fontSize: 24,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   itemContainer: {
//     width: itemWidth,
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   Images: {
//     height: 70,
//     width: 70,
//     borderRadius: 35,
//   },
//   typeofCategory: {
//     color: Typography.Colors.lightblack,
//     fontFamily: Typography.font.medium,
//     fontSize: 14,
//     paddingTop: 7,
//     textAlign: "center",
//     maxWidth: itemWidth - 10,
//   },
//   searchstyle: {
//     backgroundColor: Typography.Colors.grayy,
//     borderRadius: 15,
//     height: 55.5,
//     width: width - 60,
//   },
// });

// export default SearchScreen;
