import React, {useState} from 'react';

import HomePage from '../views/HomePage';
import LoginPage from '../views/loginPage';
import ChatPage from '../views/chatPage';
import SearchPage from '../views/searchPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Navigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = 'home';
            color = focused ? '#0FA915' : 'grey';
          } else if (route.name === 'Search') {
            iconName = 'search';
            color = focused ? '#0FA915' : 'grey';
          } else if (route.name === 'Chat') {
            iconName = 'rocketchat';
            color = focused ? '#0FA915' : 'grey';
          } else if (route.name === 'LoginPage') {
            iconName = 'user';
            color = focused ? '#0FA915' : 'grey';
          }
          return <FontAwesome5 name={iconName} size={20} color={color} />;
        },
        header: () => null,
      })}>
      {/* <Tab.Screen name="Main" component={HomePage} options={{tabBarBadge: 3}} /> */}
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="LoginPage" component={LoginPage} />
    </Tab.Navigator>
  );
}
