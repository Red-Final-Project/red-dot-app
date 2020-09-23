import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, YellowBox, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage'

import Login from './pages/LoginPage';
import Register from './pages/Register';
import Tabs from './pages/Tabs';
import MessagePage from './pages/Message';
import AddRequest from './pages/addRequest';
import AddEvent from './pages/addEvent';
import EventLocation from './pages/EventLocation';
import SetEventLocation from './pages/SetEventLocation';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

import ChatPage from './pages/Chat';

import Message from './assets/images/message.png';
import User from './assets/images/user.png';
import { COLORS, styles } from './pages/styles';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';
import WelcomePage from './pages/WelcomePage';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.log(e)
  }
  console.log('Done.')
}

const Stack = createStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    'Nova-Round': require('./assets/fonts/NovaRound-Regular.ttf'),
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-LightItalic': require('./assets/fonts/Ubuntu-LightItalic.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    // 'Ubuntu-Regular': require('./assets/fonts/Ubuntu-')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name='Welcome'
          component={WelcomePage}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            title: 'Register',
            // headerTitleStyle: {
            //   fontFamily: 'Nova-Round',
            //   color: 'red',
            //   fontSize: 25,
            // },
            // headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: styles.header,
          }}
        />
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={styles.row}>
                <Button
                  icon={{
                    name: 'note',
                    size: 18,
                    color: COLORS.primary,
                    type: 'simple-line-icon',
                  }}
                  onPress={() => navigation.navigate('AddRequest')}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                />
                <Button
                  icon={{
                    name: 'bubbles',
                    size: 18,
                    color: COLORS.primary,
                    type: 'simple-line-icon',
                  }}
                  onPress={() => navigation.navigate('Message')}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
            ),
            headerLeft: () => (
              <View style={{}}>
                <Button
                  icon={{
                    name: 'user',
                    size: 18,
                    color: COLORS.primary,
                    type: 'simple-line-icon',
                  }}
                  onPress={() => {
                    // console.log('hii');
                    navigation.navigate('Profile');
                  }}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
            ),
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),

            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name='Message'
          component={MessagePage}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Message')}
                style={styles.msgBtn}
              >
                <Image source={Message} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          })}
        />
        <Stack.Screen
          name='Chat'
          component={ChatPage}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          })}
        />
        <Stack.Screen
          name='AddRequest'
          component={AddRequest}
          options={{
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          }}
        />
        <Stack.Screen
          name='AddEvent'
          component={AddEvent}
          options={{
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          }}
        />
        <Stack.Screen
          name='SetEventLocation'
          component={SetEventLocation}
          options={{
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          }}
        />
        <Stack.Screen
          name='EventLocation'
          component={EventLocation}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Message')}
                style={styles.msgBtn}
              >
                <Image source={Message} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          })}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{}}>
                <Button
                  icon={{
                    name: 'login',
                    size: 18,
                    color: COLORS.primary,
                    type: 'simple-line-icon',
                  }}
                  onPress={() => {
                    firebase.auth().signOut().then(function() {
                      clearAll()
                      navigation.navigate('Login')
                    }).catch(function(error) {
                      console.log(error)
                    });
                  }}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
            ),
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          })}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Message')}
                style={styles.msgBtn}
              >
                <Image source={Message} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                style={{ resizeMode: 'contain', maxHeight: 18 }}
                source={require('./assets/images/logo.png')}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
