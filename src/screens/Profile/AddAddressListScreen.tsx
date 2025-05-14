import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../stores/useAuthStore";
import { updateUserdata } from "../../services/api/apiServices";
import { Typography } from "../../theme/Colors";
import Iconarrow from "react-native-vector-icons/Feather";
import CustomButton from "../../components/button/CustomButton";
import CustomTextInput from "../../components/textInput/CustomTextInput";

const AddAddressList = ({ route }) => {
  // const route = useRoute();
  const { address, index } = route.params || {};
  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Province/Region is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  const Navigation = useNavigation();
  const handlearrowbutton = () => Navigation.goBack();

  const handleAddAddresspress = async (values: any, index?: number) => {
    console.log("first");
    try {
      console.log("suiofhnr5");

      const user = useAuthStore.getState().user;
      console.log(user, "dvusdbhf");

      // // useEffect(() => {
      // console.log(user, "vdfhngv");
      // if (!user || !user.id) {
      //   Alert.alert("Session expired", "Please log in again.");
      //   // Navigation.navigate("");
      // }
      // // }, [user]);

      const newAddress = {
        firstName: values.firstName,
        lastName: values.lastName,
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        phoneNumber: values.phoneNumber,
        country: values.country,
      };

      let updatedAddresses = user.address ? [...user.address] : [];
      if (typeof index === "number") {
        updatedAddresses[index] = newAddress;
      } else {
        updatedAddresses.push(newAddress);
      }

      // const updatedUser = {
      //   ...user,
      //   address: updatedAddresses,
      // };

      const updatedUser = {
        ...user,
        address: [...updatedAddresses],
      };

      console.log("Payload to APII:", JSON.stringify(updatedUser, null, 2));
      console.log("payload to API:", { userID: user.id, updatedUser });
      const cleanUserPayload = (user: any) => {
        const {
          id,
          Otp,
          isAdmin,
          createdAt,
          updatedAt,
          password,
          ...safeUser
        } = user;

        return safeUser;
      };

      const response = await updateUserdata(
        user.id,
        cleanUserPayload(updatedUser)
      );
      // console.log("fdvmfv", response.address);
      const prevuser = useAuthStore.getState().user;
      useAuthStore.getState().setUser({ ...prevuser, ...response });

      setTimeout(() => {
        Alert.alert(
          "Success",
          index !== undefined
            ? "Address updated successfully!"
            : "Address added successfully!",
          [
            {
              text: "OK",
              onPress: () => Navigation.navigate("DeliveryAddress"),
            },
          ],
          { cancelable: false }
        );
      }, 300); // 300ms delay ensures screen stays mounted
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to add address.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  // const handleAddAddresspress = async (values: any, index?: number) => {
  //   try {
  //     const user = useAuthStore.getState().user;

  //     if (!user || !user.id) {
  //       Alert.alert("Session expired", "Please log in again.");
  //       return;
  //     }

  //     const newAddress = {
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       streetAddress: values.streetAddress,
  //       city: values.city,
  //       state: values.state,
  //       zipCode: values.zipCode,
  //       phoneNumber: values.phoneNumber,
  //       country: values.country,
  //     };

  //     const updatedAddresses = Array.isArray(user.address)
  //       ? [...user.address]
  //       : [];

  //     if (typeof index === "number") {
  //       updatedAddresses[index] = newAddress;
  //     } else {
  //       updatedAddresses.push(newAddress);
  //     }

  //     const updatedUser = {
  //       address: updatedAddresses,
  //     };

  //     const response = await updateUserdata(user.id, updatedUser);

  //     const prevUser = useAuthStore.getState().user;
  //     useAuthStore.getState().setUser({ ...prevUser, ...response });

  //     // Show alert after short delay to ensure screen is mounted
  //     setTimeout(() => {
  //       Alert.alert(
  //         "Success",
  //         index !== undefined
  //           ? "Address updated successfully!"
  //           : "Address added successfully!",
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => Navigation.navigate("DeliveryAddress"),
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }, 300); // 300ms delay
  //   } catch (error: any) {
  //     setTimeout(() => {
  //       Alert.alert(
  //         "Error",
  //         error.message || "Failed to add address.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     }, 300);
  //   }
  // };

  const handleDeleteAddress = () => {
    try {
      const user = useAuthStore.getState().user;
      if (!user || !user.address) {
        throw new Error("No addresses found to delete.");
      }

      let updatedAddresses = [...user.address];
      if (typeof index === "number") {
        updatedAddresses.splice(index, 1);
      }

      const updatedUser = {
        ...user,
        address: updatedAddresses,
      };

      useAuthStore.getState().setUser(updatedUser);

      Alert.alert("Success", "Address deleted successfully!", [
        { text: "OK", onPress: () => Navigation.navigate("DeliveryAddress") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete address.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Typography.Colors.white }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={handlearrowbutton}>
            <Iconarrow
              size={35}
              color={Typography.Colors.black}
              style={styles.arrow}
              name="arrow-left"
            />
          </TouchableOpacity>
          <Text style={styles.addressText}>Add Address</Text>
        </View>

        <Formik
          initialValues={{
            country: address?.country || "",
            firstName: address?.firstName || "",
            lastName: address?.lastName || "",
            streetAddress: address?.streetAddress || "",
            city: address?.city || "",
            state: address?.state || "",
            zipCode: address?.zipCode || "",
            phoneNumber: address?.phoneNumber || "",
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => handleAddAddresspress(values, index)}
        >
          {({ handleChange, values, errors, handleSubmit, touched }) => {
            console.log("formik errors:", errors);
            return (
              <>
                <View style={styles.boxstyle}>
                  <View>
                    <Text style={styles.textstyle}>Country</Text>
                    {renderField(
                      "Country",
                      "country",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>First Name</Text>
                    {renderField(
                      "First Name",
                      "firstName",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>Last Name</Text>
                    {renderField(
                      "Last Name",
                      "lastName",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>Street Address</Text>
                    {renderField(
                      "Street Address",
                      "streetAddress",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>City</Text>
                    {renderField(
                      "City",
                      "city",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>State/Province/Region</Text>

                    {renderField(
                      "State/Province/Region",
                      "state",
                      values,
                      handleChange,
                      errors,
                      touched
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>zip Code</Text>
                    {renderField(
                      "Zip Code",
                      "zipCode",
                      values,
                      handleChange,
                      errors,
                      touched,
                      "number-pad"
                    )}
                  </View>
                  <View>
                    <Text style={styles.textstyle}>Phone Number</Text>

                    {renderField(
                      "Phone Number",
                      "phoneNumber",
                      values,
                      handleChange,
                      errors,
                      touched,
                      "number-pad"
                    )}
                  </View>
                </View>

                <View style={styles.buttonviewstyle}>
                  <CustomButton
                    title={"Delete"}
                    onPress={handleDeleteAddress}
                    buttonStyle={styles.buttonstyle}
                    textStyle={styles.buttontextstyle}
                  />
                  <CustomButton
                    title={"Add Address"}
                    onPress={() => {
                      // console.log("first");
                      handleSubmit();
                    }}
                    buttonStyle={styles.buttonstyleaddress}
                    textStyle={styles.buttontextstyleaddress}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

const renderField = (
  label: string,
  name: string,
  values: any,
  handleChange: any,
  errors: any,
  touched: any,
  keyboardType: any = "default"
) => (
  <View style={{ marginBottom: 12 }}>
    <CustomTextInput
      value={values[name]}
      onChangeText={handleChange(name)}
      placeholder={label}
      keyboardType={keyboardType}
      containerStyle={styles.borderstyle}
    />
    {touched[name] && errors[name] && (
      <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
        {errors[name]}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: Typography.Colors.white,
  },
  boxstyle: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
  },
  buttontextstyle: {
    color: Typography.Colors.red,
  },
  buttontextstyleaddress: {
    marginTop: 2,
    color: Typography.Colors.white,
  },
  borderstyle: {
    opacity: 0.8,
    borderColor: Typography.Colors.primary,
  },
  arrow: {
    marginTop: 3,
  },
  buttonstyle: {
    textAlign: "center",
    height: 57,
    width: 167,
    borderWidth: 1,
    backgroundColor: Typography.Colors.white,
    borderColor: Typography.Colors.red,
  },
  buttonstyleaddress: {
    textAlign: "center",
    height: 57,
    width: 167,
    backgroundColor: Typography.Colors.primary,
  },
  buttonviewstyle: {
    marginHorizontal: 18,
    flexDirection: "row",
    gap: 10,
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
  textstyle: {
    color: Typography.Colors.primary,
    fontFamily: Typography.font.bold,
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
});

export default AddAddressList;

// const AddAdressList = () => {
// //   const [Country, setCountry] = useState("");
// //   const [firstName, setfirstName] = useState("");
// //   const [lastName, setlastName] = useState("");
// //   const [streetAddress, setstreetAddress] = useState("");
// //   const [city, setcity] = useState("");
// //   const [state, setstate] = useState("");
// //   const [zip, setzip] = useState("");
// //   const [phoneNumber, setphoneNumber] = useState("");
// const validationSchema = Yup.object().shape({
//   Country: Yup.string().required('Country is required'),
//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   streetAddress: Yup.string().required('Street Address is required'),
//   city: Yup.string().required('City is required'),
//   state: Yup.string().required('State/Province/Region is required'),
//   zip: Yup.string().required('Zip Code is required'),
//   phoneNumber: Yup.string().required('Phone Number is required'),
// });
// const Navigation = useNavigation();

// const handlearrowbutton = () => {
//     Navigation.goBack();
//   };

// const handleAddAddresspress = () => {};
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.mainContainer}>
//           <TouchableOpacity onPress={handlearrowbutton}>
//             <Iconarrow
//               size={35}
//               color={Typography.Colors.black}
//               style={styles.arrow}
//               name="arrow-left"
//             />
//           </TouchableOpacity>
//           <Text style={styles.addressText}>Add Address</Text>
//         </View>

//       <Formik
//           initialValues={{
//             country: '',
//             firstName: '',
//             lastName: '',
//             streetAddress: '',
//             city: '',
//             state: '',
//             zip: '',
//             phoneNumber: '',
//           }}
//           validationSchema={validationSchema}

//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             value,
//             errors,
//             touched,
//           }) => (
//             <>
//         <View style={styles.boxstyle}>
//           <View>
//             <Text style={styles.textstyle}>Country</Text>
//             <CustomTextInput
//               value={Country}
//               onChangeText={setCountry}
//               placeholder="Country"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>First Name</Text>
//             <CustomTextInput
//               value={firstName}
//               onChangeText={setfirstName}
//               placeholder="First Name"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>Last Name</Text>
//             <CustomTextInput
//               value={lastName}
//               onChangeText={setlastName}
//               placeholder="Last Name"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>Street Address</Text>
//             <CustomTextInput
//               value={streetAddress}
//               onChangeText={setstreetAddress}
//               placeholder="Street Address"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>City</Text>
//             <CustomTextInput
//               value={city}
//               onChangeText={setcity}
//               placeholder="City"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>State/Province/Region</Text>
//             <CustomTextInput
//               value={state}
//               onChangeText={setstate}
//               placeholder="State/Province/Region"
//               keyboardType="default"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>Zip Code</Text>
//             <CustomTextInput
//               value={zip}
//               onChangeText={setzip}
//               placeholder="Zip Code"
//               keyboardType="number-pad"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//           <View>
//             <Text style={styles.textstyle}>Phone Number</Text>
//             <CustomTextInput
//               value={phoneNumber}
//               onChangeText={setphoneNumber}
//               placeholder="Phone Number"
//               keyboardType="number-pad"
//               containerStyle={styles.borderstyle}
//             />
//           </View>
//         </View>
//         <View style={styles.buttonviewstyle}>
//           <CustomButton
//             title={"Delete"}
//             onPress={handleAddAddresspress}
//             buttonStyle={styles.buttonstyle}
//             textStyle={styles.buttontextstyle}
//           />

//           <CustomButton
//             title={"Add Address"}
//             onPress={handleAddAddresspress}
//             buttonStyle={styles.buttonstyleaddress}
//             textStyle={styles.buttontextstyleaddress}
//           />
//         </View>
//           </>
//         )}
//          </Formik>
//       </View>
//     </ScrollView>
//   );
// };

//         <Formik
//           initialValues={{
//             country: '',
//             firstName: '',
//             lastName: '',
//             streetAddress: '',
//             city: '',
//             state: '',
//             zip: '',
//             phoneNumber: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleAddAddresspress}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//           }) => (
//             <>
//               <View style={styles.boxstyle}>
//                 <TextInputField
//                   label="Country"
//                   value={values.country}
//                   onChangeText={handleChange('country')}
//                   onBlur={handleBlur('country')}
//                   error={touched.country && errors.country}
//                 />

//                 <TextInputField
//                   label="First Name"
//                   value={values.firstName}
//                   onChangeText={handleChange('firstName')}
//                   onBlur={handleBlur('firstName')}
//                   error={touched.firstName && errors.firstName}
//                 />

//                 <TextInputField
//                   label="Last Name"
//                   value={values.lastName}
//                   onChangeText={handleChange('lastName')}
//                   onBlur={handleBlur('lastName')}
//                   error={touched.lastName && errors.lastName}
//                 />

//                 <TextInputField
//                   label="Street Address"
//                   value={values.streetAddress}
//                   onChangeText={handleChange('streetAddress')}
//                   onBlur={handleBlur('streetAddress')}
//                   error={touched.streetAddress && errors.streetAddress}
//                 />

//                 <TextInputField
//                   label="City"
//                   value={values.city}
//                   onChangeText={handleChange('city')}
//                   onBlur={handleBlur('city')}
//                   error={touched.city && errors.city}
//                 />

//                 <TextInputField
//                   label="State/Province/Region"
//                   value={values.state}
//                   onChangeText={handleChange('state')}
//                   onBlur={handleBlur('state')}
//                   error={touched.state && errors.state}
//                 />

//                 <TextInputField
//                   label="Zip Code"
//                   value={values.zip}
//                   onChangeText={handleChange('zip')}
//                   onBlur={handleBlur('zip')}
//                   error={touched.zip && errors.zip}
//                   keyboardType="number-pad"
//                 />

//                 <TextInputField
//                   label="Phone Number"
//                   value={values.phoneNumber}
//                   onChangeText={handleChange('phoneNumber')}
//                   onBlur={handleBlur('phoneNumber')}
//                   error={touched.phoneNumber && errors.phoneNumber}
//                   keyboardType="number-pad"
//                 />
//               </View>

//               <View style={styles.buttonviewstyle}>
//                 <CustomButton
//                   title="Delete"
//                   onPress={() => Navigation.goBack()}
//                   buttonStyle={styles.buttonstyle}
//                   textStyle={styles.buttontextstyle}
//                 />
//                 <CustomButton
//                   title="Add Address"
//                   onPress={handleSubmit}
//                   buttonStyle={styles.buttonstyleaddress}
//                   textStyle={styles.buttontextstyleaddress}
//                 />
//               </View>
//             </>
//           )}
//         </Formik>
//       </View>
//     </ScrollView>
//   );
// };

// // Helper to render inputs consistently
// const TextInputField = ({
//   label,
//   value,
//   onChangeText,
//   onBlur,
//   error,
//   keyboardType = 'default',
// }) => (
//   <View style={{ marginBottom: 12 }}>
//     <Text style={styles.textstyle}>{label}</Text>
//     <CustomTextInput
//       value={value}
//       onChangeText={onChangeText}
//       onBlur={onBlur}
//       placeholder={label}
//       keyboardType={keyboardType}
//       containerStyle={styles.borderstyle}
//     />
//     {error && <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>}
//   </View>
// );

// export default AddAdressList;

// const validationSchema = Yup.object().shape({
//   country: Yup.string().required('Country is required'),
//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   streetAddress: Yup.string().required('Street Address is required'),
//   city: Yup.string().required('City is required'),
//   state: Yup.string().required('State is required'),
//   zip: Yup.string().required('Zip Code is required'),
//   phoneNumber: Yup.string().required('Phone Number is required'),
// });

// const AddAdressList = () => {
//   const Navigation = useNavigation();
//   const handlearrowbutton = () => Navigation.goBack();

//   const handleAddAddresspress = (values) => {
//     console.log('Form Values:', values);
//     // send to API here
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.mainContainer}>
//           <TouchableOpacity onPress={handlearrowbutton}>
//             <Iconarrow
//               size={35}
//               color={Typography.Colors.black}
//               style={styles.arrow}
//               name="arrow-left"
//             />
//           </TouchableOpacity>
//           <Text style={styles.addressText}>Add Address</Text>
//         </View>

//         <Formik
//           initialValues={{
//             country: '',
//             firstName: '',
//             lastName: '',
//             streetAddress: '',
//             city: '',
//             state: '',
//             zip: '',
//             phoneNumber: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleAddAddresspress}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//           }) => (
//             <>
//               <View style={styles.boxstyle}>
//                 {renderField('Country', 'country', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('First Name', 'firstName', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('Last Name', 'lastName', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('Street Address', 'streetAddress', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('City', 'city', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('State/Province/Region', 'state', values, handleChange, handleBlur, errors, touched)}
//                 {renderField('Zip Code', 'zip', values, handleChange, handleBlur, errors, touched, 'number-pad')}
//                 {renderField('Phone Number', 'phoneNumber', values, handleChange, handleBlur, errors, touched, 'number-pad')}
//               </View>

//               <View style={styles.buttonviewstyle}>
//                 <CustomButton
//                   title={"Delete"}
//                   onPress={Navigation.goBack}
//                   buttonStyle={styles.buttonstyle}
//                   textStyle={styles.buttontextstyle}
//                 />

//                 <CustomButton
//                   title={"Add Address"}
//                   onPress={handleSubmit}
//                   buttonStyle={styles.buttonstyleaddress}
//                   textStyle={styles.buttontextstyleaddress}
//                 />
//               </View>
//             </>
//           )}
//         </Formik>
//       </View>
//     </ScrollView>
//   );
// };

// // Helper function to render each field with error
// const renderField = (
//   label,
//   name,
//   values,
//   handleChange,
//   handleBlur,
//   errors,
//   touched,
//   keyboardType = 'default'
// ) => (
//   <View style={{ marginBottom: 12 }}>
//     <Text style={styles.textstyle}>{label}</Text>
//     <CustomTextInput
//       value={values[name]}
//       onChangeText={handleChange(name)}
//       onBlur={handleBlur(name)}
//       placeholder={label}
//       keyboardType={keyboardType}
//       containerStyle={styles.borderstyle}
//     />
//     {touched[name] && errors[name] && (
//       <Text style={{ color: 'red', fontSize: 12 }}>{errors[name]}</Text>
//     )}
//   </View>
// );

// export default AddAdressList;
