import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomTextInput from '../components/TextInput/customTextInput';
import CustomButton from '../components/Buttons/customButton';
import { Typography } from '../theme/Colors';
import { assets } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';


export default function VerifyotpScreen() {
  const Navigation = useNavigation();
   
  const Sendverification = () => {
    
  };

  return (
    <View style={styles.container}>

      {/* <View style={{marginBottom:10}}> */}
      <View style={styles.welcomeandsignup}>
        <Text style={styles.welcomeText}>Enter Verification Code</Text>
        <Text style={styles.subText}>We will send you a message to set or reset your new password</Text>
      </View>
      {/* </View> */}

      <CustomTextInput
        // value={email}
        // onChangeText={setEmail}
        placeholder="Enter OTP here"
        keyboardType="number-pad"
      />


      <CustomButton title="Confirm" onPress={Sendverification} buttonStyle={styles.buttonstyle} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:200,
    // marginBottom:60,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.heavy,
    color: Typography.Colors.primary,
    marginTop: 10,
    marginBottom: 5,
  },
  subText: {
    fontFamily: Typography.font.regular,
    fontSize: 15,
    color: Typography.Colors.lightgrey,
    marginBottom: 30,
  },
  containerlogo: {
    width: 72,
    height: 72,
    backgroundColor: Typography.Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  diamond: {
    width: 32,
    height: 32,
    transform: [{ rotate: '45deg' }],
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 42
  },
  welcomeandsignup: {  
    alignItems: 'center',
    marginTop: 15 ,
    paddingBottom: 48
  },
  buttonstyle: {
    height: 52,
  }
});
