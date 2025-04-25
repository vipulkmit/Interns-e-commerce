import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import useAuthStore from '../stores/useAuthStore';
import CustomTextInput from '../components/TextInput/customTextInput';
import CustomButton from '../components/Buttons/customButton';
import { TouchableOpacity } from 'react-native';
import { Typography } from '../theme/Colors';
import { assets } from '../../assets/images';




export default function LoginScreen() {
  const { login } = useAuthStore();
  // const {email, password, setEmail, setPassword,} = useAuthStore();

  const handleLoginPress = () => {
    login(); 
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password pressed');
  };

  const handleRegisterPress = () => {
    console.log('Register pressed');
  };

  const handleSocialLoginPress = () => {
    console.log('login pressed')
  };

  return (
    <View style={styles.container}>
      
     <View style={styles.logoContainer}>
     <View style={styles.containerlogo}>
      <View style={styles.diamond}>
        <Image source={assets.logofirst} style={styles.diamond} />
        </View>
    </View>
     </View>


     <View style={styles.welcomeandsignup}>
     <Text style={styles.welcomeText}>Welcome back to E-Com!</Text>
     <Text style={styles.subText}>Sign in to continue</Text>
      </View>

      <CustomTextInput
        // value={email}
        // onChangeText={setEmail}
        placeholder="Your Email / Phone Number"
        keyboardType="email-address"
        iconname='person'
        iconsize={20}
        iconcolor={Typography.Colors.lightgrey}
      />


      <CustomTextInput
        // value={password}
        // onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        iconname='lock'
        iconsize={20}
        iconcolor={Typography.Colors.lightgrey}
      />

    
      <TouchableOpacity onPress={handleForgotPasswordPress} style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

     
      <CustomButton title="Login" onPress={handleLoginPress} />



      <View style={{alignSelf:'center', marginTop: 36, flexDirection:'row', gap: 10, paddingBottom:42}}>
      <View style={{height:1}}></View>
      <Text style={styles.orText}>OR</Text>
      <View  style={{height:1}}></View>
      </View>


      {/* Social Login Buttons */}
      <Text style={styles.socialText}>Login using</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
        <Image source={assets.applelogo} style={styles.socialIcon} />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
          <Image source={assets.facebooklogo} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialLoginPress()}>
         <Image source={assets.googlelogo} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Typography.Colors.white,
  },
   welcomeText: {
    fontSize: 18,
    fontFamily: Typography.font.bold,
    color: Typography.Colors.navyblue,
    marginTop: 20,
    marginBottom: 5,
  },
   subText: {
    fontFamily: Typography.font.regular,
    fontSize: 18,
    color: Typography.Colors.lightgrey,
    marginBottom: 30,
  },
   forgotContainer: {
    marginTop: 7 ,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
   forgotText: {
    fontFamily: Typography.font.bold,
    fontSize: 16,
    color: Typography.Colors.primary,
  },
   orText: {
    fontFamily: Typography.font.bold,
    textAlign: 'center',
    fontSize: 15,
    color: Typography.Colors.darkgrey,
    marginVertical: 10,
  },
   socialText: {
    alignSelf: 'center',
    fontFamily: Typography.font.regular,
    fontSize: 16,
    color: Typography.Colors.black,
    marginBottom: 20,
  },
   socialButtons: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 62, 
  },

   socialIcon: {
    width:46,
    height:46,
  },
  
   registerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
   registerText: {
    fontSize: 14,
    color: Typography.Colors.black,
  },
   registerLink: {
    fontSize: 14,
    color: Typography.Colors.primary,
    fontWeight: 'bold',
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
    logoContainer: {alignItems:'center',marginTop:42},
    welcomeandsignup:{alignItems:'center', marginTop:26, paddingBottom: 48}
  // emailContainer:{
  //   gap: 8,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 2,
  //   borderRadius: 70,
  //   borderColor: '#85868A',
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   marginHorizontal: 10,
  //   height: 50,
  // },
  // emailicon:{
  //   color: Typography.Colors.white,
  //   fontSize: 15
  // }
});
















// import { Text,StyleSheet, View } from "react-native"
// import useAuthStore from "../stores/useAuthStore"
// import { TouchableOpacity } from "react-native"



// export default function LoginScreen() {
//     const login = useAuthStore((state) => state.login)
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.buttonstyle} onPress={login}>
//         <Text style={styles.textstyle}>Let's Go to HomeScreen</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginBottom:100,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         borderColor: '#002482',
//       },
//       textstyle: {
//         fontSize: 14,
//         padding: 10,
//         color: 'black',
//         fontWeight: 'bold',
//         textAlign: 'center',
//       },
//       buttonstyle: {
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#002482',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
// })

