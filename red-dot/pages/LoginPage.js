import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  ScrollView,
  // ToastAndroid,
} from 'react-native';
import { AppLoading } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PasswordInput from 'react-native-toggle-password-visibility-expo';
import { useFonts } from 'expo-font';
import { COLORS, SIZE, SPACE, styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import Background from '../assets/images/Background.png';
import FacebookImage from '../assets/images/facebook.png';
import GoogleImage from '../assets/images/google.png';

import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import logo from '../assets/images/logo.png';

import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from '../components/Toast';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export let dbAuth = firebase.firestore();

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('USER', jsonValue);
  } catch (err) {
    console.log(err);
  }
};

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [visibleToast, setvisibleToast] = useState(false);

  //Toast
  useEffect(() => {
    setvisibleToast(false);
    setTimeout(() => {
      setIsEmail(false);
      setIsPassword(false);
    }, 4000);
  }, [visibleToast, email, password]);

  // console.log(email, password, '<<<< check input data');


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
              dbAuth
              .collection("users")
              .where("email", "==", result.user.email)
              .get()
              .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                storeData({email: doc.data().email, _id: doc.id})
              })
              })
            navigation.navigate('Tabs')
            return result.accessToken
          } else {
            return { cancelled: true };
        
      }
    } catch (e) {
      return { error: true };
    }
  };

  // https://firebase.google.com/docs/auth/web/google-signin
  const onSignIn = (googleUser) => {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          console.log(!isUserEqual(googleUser, firebaseUser));
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              // console.log(result.additionalUserInfo, "testing <<<<<<<<<")
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
                  .collection('users')
                  .doc(result.user.uid)
                  .set({
                    email: result.user.email,
                    profile_picture: {
                      uri: result.user.photoUrl,
                    },
                    name: result.additionalUserInfo.profile.name,
                    last_donation_date: '_',
                    bloodType: '_',
                    createdAt: Date.now(),
                  })
                  .then(function () {
                    console.log('Document successfully written!');
                  })
                  .catch(function (error) {
                    console.error('Error writing document: ', error);
                  });
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
                  .collection('users')
                  .doc(result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  })
                  .then(function () {
                    console.log('Document successfully updated!');
                  })
                  .catch(function (error) {
                    console.error('Error updating document: ', error);
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              // ...
            });
          // storeData({email: result.user.email})
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
  };

  // https://firebase.google.com/docs/auth/web/google-signin
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  // https://docs.expo.io/guides/using-firebase/
  // Listen for authentication state to change.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user)
      if (user !== null) {
        dbAuth
        .collection("users")
        .where('email', "==", user.email)
        .get()
        .then(data => {
          // console.log(data, "dari dataaaa>>>>>>")
          if(!data) {
            return dbAuth
            .collection("users")
            .doc(user.uid)
            .set({
            email: user.email,
            profile_picture: {uri: user.photoURL},
            last_donation_date: "_",
            bloodType: "_",
            name: user.displayName,
            createdAt: Date.now()
        })
          }
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        })
      } else {
        console.log('No user found in Facebook');
      }
    });
  }, []);

  let [fontsLoaded] = useFonts({
    'Nova-Round': require('../assets/NovaRound-Regular.ttf'),
  });

  const loginHandler = () => {
    navigation.navigate('Tabs');
    let validation = false;
    if (!email) {
      setIsEmail(true);
      validation = true;
    }
    if (!password) {
      setIsPassword(true);
      validation = true;
    }
    if (!validation) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dbAuth
          .collection("users")
          .where("email", "==", email)
          .get()
          .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                storeData({email: doc.data().email, _id: doc.id})
              })
          })
        .catch(err => {
            console.log(err)
        })
          navigation.navigate('Tabs')
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    } else {
      setvisibleToast(true);
    }
  };
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
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // ====
  const loginWithFacebook = async () => {
    await Facebook.initializeAsync('622528821789686');

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      navigation.navigate('Tabs');

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          // Handle Errors here.
          console.log(error, '<<<< Error from FB login');
        });
    }
  };

  // const [visibleToast, setvisibleToast] = useState(false);

  return (
    <View style={styles.containerCenter}>
      <StatusBar translucent backgroundColor={COLORS.lightPrimary} />
      <Toast visible={visibleToast} message='Fields is required' />
      <ImageBackground source={{}} style={styles.background}>
        <Image source={logo} style={styles.logo} />

        <View>
          <TextInput
            style={isEmail ? styles.textInputAlert : styles.textInput}
            onChangeText={setEmail}
            placeholder='Email'
          />

          <PasswordInput
            style={isPassword ? styles.textInputAlert : styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            inlineImagePadding={0}
          />

          <TouchableOpacity
            style={{ ...styles.buttonPrimary, marginTop: SPACE(4) }}
            onPress={loginHandler}
          >
            <Text style={styles.textWhite}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.pLogin}>or login with:</Text>

          <View style={styles.socialLogin}>
            <TouchableOpacity
              onPress={() => {
                loginWithFacebook();
              }}
              style={styles.socialButtonContainer}
            >
              <Image source={FacebookImage} style={styles.socialButton}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signInWithGoogleAsync();
              }}
              style={styles.socialButtonContainer}
            >
              <Image source={GoogleImage} style={styles.socialButton}></Image>
            </TouchableOpacity>
          </View>

          <Text style={styles.pLogin}>Didn't Have an Account?</Text>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonRegister}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
