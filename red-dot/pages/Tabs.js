import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Home from '../Tabs/Home';
import Event from '../Tabs/Event';
import Search from '../Tabs/Search';
import Discover from '../Tabs/Discover';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS, styles } from './styles';

const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.lightAlt,
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'grid';
              break;
            case 'Event':
              iconName = 'event';
              break;
            case 'Search':
              iconName = 'magnifier';
              break;
            case 'Discover':
              iconName = 'compass';
              break;
            default:
              break;
          }

          return <SimpleLineIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.lightAlt,
        showLabel: false,
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Event' component={Event} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Discover' component={Discover} />
    </Tab.Navigator>
  );
}
