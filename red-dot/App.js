import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, Image,YellowBox } from 'react-native';
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'

import Login from './pages/LoginPage'
import Register from './pages/Register'
import Tabs from './pages/Tabs'
import MessagePage from './pages/Message'
import AddRequest from './pages/addRequest'
import EventLocation from './pages/EventLocation'
import Profile from './pages/Profile'

import Message from './assets/images/message.png'
import User from './assets/images/user.png'
import { styles } from './pages/styles';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const Stack = createStackNavigator()
export default function App() {
  let [fontsLoaded] = useFonts({
      'Nova-Round': require('./assets/NovaRound-Regular.ttf')
  })  

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{
          title: 'red.',
          headerTitleStyle: {
            fontFamily: 'Nova-Round',
            color: 'red',
            fontSize: 25
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'whitesmoke',
          }
        }} />
        <Stack.Screen name="Tabs" component={Tabs} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Message')}
                style={styles.msgBtn}
              >
                <Image source={Message} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileBtn}
              >
                <Image source={User} style={styles.headerImg} />
              </TouchableOpacity>
            ),
            title: 'red.',
            headerTitleStyle: {
              fontFamily: 'Nova-Round',
              color: 'red',
              fontSize: 25
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            }
          })}/>
          <Stack.Screen name="Message" component={MessagePage} 
            options={({navigation}) => ({
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
                fontSize: 25
              },
              headerTintColor: 'black',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'whitesmoke',
              }
            })}/>
          <Stack.Screen name="AddRequest" component={AddRequest} 
            options={{
              title: 'red.',
              headerTitleStyle: {
                fontFamily: 'Nova-Round',
                color: 'red',
                fontSize: 25
              },
              headerTintColor: 'black',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'whitesmoke',
              }
          }}/>
          <Stack.Screen name="EventLocation" component={EventLocation} 
            options={({navigation}) => ({
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
                fontSize: 25
              },
              headerTintColor: 'black',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'whitesmoke',
              }
            })}/>
            <Stack.Screen name="Profile" component={Profile} 
            options={({navigation}) => ({
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
                fontSize: 25
              },
              headerTintColor: 'black',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'whitesmoke',
              }
            })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

