import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Home from '../Tabs/Home';
import Event from '../Tabs/Event';
import Search from '../Tabs/Search';
import Discover from '../Tabs/Discover';
// import {getData} from '../AsyncStore'

import HomeImage from '../assets/images/home.png';
import EventImage from '../assets/images/event.png';
import SearchImage from '../assets/images/magnifier.png';
import DiscoverImage from '../assets/images/radar.png';

import { styles } from './styles';

const Tab = createBottomTabNavigator();
export default function Tabs() {
  // useEffect(() => {
  //     getData()
  // }, [])
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#800000',
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarVisible: true,
          tabBarIcon: () => (
            <Image source={HomeImage} style={styles.tabImage} />
          ),
        }}
      />
      <Tab.Screen
        name='Event'
        component={Event}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: () => (
            <Image source={EventImage} style={styles.tabImage} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <Image source={SearchImage} style={styles.tabImage} />
          ),
        }}
      />
      <Tab.Screen
        name='Discover'
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: () => (
            <Image source={DiscoverImage} style={styles.tabImage} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
