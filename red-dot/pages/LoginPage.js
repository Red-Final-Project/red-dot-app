import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, ImageBackground, TextInput, Image, Alert} from 'react-native';
import {AppLoading} from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PasswordInput from 'react-native-toggle-password-visibility-expo'
import { useFonts } from 'expo-font'
import {styles} from './styles'

import Background from '../assets/images/Background.png'
import FacebookImage from '../assets/images/facebook.png'
import GoogleImage from '../assets/images/google.png'

import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import * as firebase from 'firebase';
import 'firebase/firestore';
import {storeData} from '../AsyncStore'
import {firebaseConfig} from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  }

let dbAuth = firebase.firestore()

export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)

  console.log(email, password,"<<<< check input data")

    // ======== LOGIN INTEGRATION
      // https://docs.expo.io/versions/latest/sdk/google/
      const signInWithGoogleAsync= async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '393878517160-f2ul3ve3qs5e0g8vreqgn751sg4qpa8o.apps.googleusercontent.com',
            iosClientId: '393878517160-b8oil4rd2a990far6bjkbg2albc9aoe9.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          })
          if (result.type === 'success') {
            onSignIn(result)
            navigation.navigate('Tabs')
            return result.accessToken

          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    
    // https://firebase.google.com/docs/auth/web/google-signin
    const onSignIn = (googleUser) => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      const unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
              )
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              if (result.additionalUserInfo.isNewUser){
              // To realtime database:
              // https://docs.expo.io/guides/using-firebase/#authenticated-data-updates-with-firebase-realtime-database
              // firebase
                // .database()
                // .ref('/users/' + result.user.uid)
                // .set({
                //   email: result.user.email,
                //   profile_picture: result.additionalUserInfo.profile.picture,
                //   name: result.additionalUserInfo.profile.name,
                //   createdAt: Date.now() 
                // })
              
              // To firestore: 
              // https://docs.expo.io/guides/using-firebase/#using-expo-with-firestore
              dbAuth
              .collection("users")
              .doc(result.user.uid)
              .set({
                email: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                name: result.additionalUserInfo.profile.name,
                createdAt: Date.now()
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              })
              } else {
                // To realtime database:
                // https://docs.expo.io/guides/using-firebase/#authenticated-data-updates-with-firebase-realtime-database
                // firebase
                  // .database()
                  // .ref('/users/' + result.user.uid)
                  // .update({
                  //   last_logged_in: Date.now()
                  // })
  
                // To firestore: 
                // https://docs.expo.io/guides/using-firebase/#using-expo-with-firestore
                dbAuth
                .collection("users")
                .doc(result.user.uid)
                .update({
                  last_logged_in: Date.now()
                })
                .then(function() {
                  console.log("Document successfully updated!");
                })
                .catch(function(error) {
                  console.error("Error updating document: ", error);
                })
              }
            })
            .catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
              })
        } else {
          console.log('User already signed-in Firebase.');
        }
      })
    }
  
    // https://firebase.google.com/docs/auth/web/google-signin
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        const providerData = firebaseUser.providerData;
        for (let i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }
  
    // https://docs.expo.io/guides/using-firebase/
  // Listen for authentication state to change.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dbAuth
        .collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          profile_picture: user.photoURL,
          name: user.displayName,
          createdAt: Date.now()
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        })
      } else {
        console.log("No user found in Facebook")
      }
    })
  },[])

  
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
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dbAuth
        .collection('users')
        .where("email", "==", email )
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            storeData(doc.data())
          })
        })
        .catch(error => {
          console.log(error, 'error find data')
        })
        navigation.navigate('Tabs')
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      // ...
      })

  }
  // firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     // ...
  //     })
  //   if(!validation) {
  //      navigation.navigate('Tabs')
  //   }
    // }
    if(!fontsLoaded) {
      return <AppLoading />
    }

// ====
  const loginWithFacebook = async () => {
    await Facebook.initializeAsync(
      '622528821789686',
   );
  
   const { type, token } = await Facebook.logInWithReadPermissionsAsync(
     { permissions: ['public_profile'] }
   );
  
   if (type === 'success') {
     // Build Firebase credential with the Facebook access token.
     
     const credential = firebase.auth.FacebookAuthProvider.credential(token)
     navigation.navigate('Tabs')
  
     // Sign in with credential from the Facebook user.
     firebase.auth().signInWithCredential(credential).catch((error) => {
       // Handle Errors here.
       console.log(error,"<<<< Error from FB login")
     });
   }
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
                <TextInput style={styles.emailInput} onChangeText={setEmail} placeholder="e.g: John@mail.com" />
                <Text style={styles.passwordLabel}>Password:</Text>
                <PasswordInput style={styles.passwordInput} value={password} onChangeText={setPassword} placeholder="Your Password" />
            </View>
            <TouchableOpacity style={styles.button} onPress={(e) => loginHandler(e)}>
                <Text style={styles.loginBtn}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.textMargin}>or</Text>
            <Text style={styles.textMargin}>Login with:</Text>
            <View style={styles.auth}>
              <TouchableOpacity onPress={() => {loginWithFacebook()}}>
                <Image source={FacebookImage} style={styles.facebook}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {signInWithGoogleAsync()}}>
                <Image source={GoogleImage} style={styles.google}></Image>
              </TouchableOpacity>
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