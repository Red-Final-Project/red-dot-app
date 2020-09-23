import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, YellowBox, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

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

const Stack = createStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    'Nova-Round': require('./assets/NovaRound-Regular.ttf'),
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
                    name: 'note',
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
            title: 'red.',
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
            title: 'red.',
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
            title: 'red.',
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
            title: 'red.',
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
            title: 'red.',
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
            title: 'red.',
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
              <TouchableOpacity
                onPress={() => navigation.navigate('Message')}
                style={styles.msgBtn}
              >
                <Image source={Message} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            title: 'red.',
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
            title: 'red.',
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
