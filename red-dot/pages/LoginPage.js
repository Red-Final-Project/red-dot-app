import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View, ImageBackground, TextInput, Image} from 'react-native';
import {AppLoading} from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PasswordInput from 'react-native-toggle-password-visibility-expo'
import { useFonts } from 'expo-font'
import {styles} from './styles'

import Background from '../assets/images/Background.png'
import Facebook from '../assets/images/facebook.png'
import Google from '../assets/images/google.png'

export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  
  let [fontsLoaded] = useFonts({
      'Nova-Round': require('../assets/NovaRound-Regular.ttf')
  })

  const loginHandler = () => {
    let validation = false
    if(!email) {
       setIsEmpty(true)
       validation = true
    } 
    if(!password) {
       setIsEmpty(true)
       validation = true
    }
    if(!validation) {
       navigation.navigate('Tabs')
    }
  }
  if(!fontsLoaded) {
      return <AppLoading />
  }
  return (
    <View style={styles.container}>
        <ImageBackground source={Background} style={styles.background}>
            <Text style={styles.logo}>red.</Text>
            <View>
                <Text style={styles.alertLogin}>
                    {isEmpty ? 'No Empty Field!' : ''}
                </Text>
                <Text style={styles.emailLabel}>Email:</Text>
                <TextInput style={styles.emailInput} onChange={setEmail} placeholder="e.g: John@mail.com" />
                <Text style={styles.passwordLabel}>Password:</Text>
                <PasswordInput style={styles.passwordInput} value={password} onChangeText={setPassword} placeholder="Your Password" />
            </View>
            <TouchableOpacity style={styles.button} onPress={(e) => loginHandler(e)}>
                <Text style={styles.loginBtn}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.textMargin}>or</Text>
            <Text style={styles.textMargin}>Login with:</Text>
            <View style={styles.auth}>
                <Image source={Facebook} style={styles.facebook}></Image>
                <Image source={Google} style={styles.google}></Image>
            </View>
            <View>
                <Text style={styles.register}>
                    Didn't Have an Account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerBtn}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        <StatusBar style="auto" />
    </View>
  );
}