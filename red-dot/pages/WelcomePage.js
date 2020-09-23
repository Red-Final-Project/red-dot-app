import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import logo from '../assets/images/logo.png';
import bgWp from '../assets/images/bg-wp.jpg';
import { styles, SIZE, PX, MY } from './styles';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../assets/images/bg-wp.jpg';
export default WelcomePage = (params) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

    </View>
  );
};
