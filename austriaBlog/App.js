import 'react-native-gesture-handler';
import React,{useState, useEffect, useRef} from "react";
import {Animated, StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Europe from "./routs/Europe";
import OtherWorld from "./routs/OtherWorld";
import MyProfile from "./routs/MyProfile";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//  #36212c  #8c1633

const App = () => {

  return (
    <NavigationContainer>

      <Tab.Navigator initialRouteName='Europe' screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
      }}>
      
        <Tab.Screen name="My Profile" component={MyProfile} options={{
          tabBarActiveBackgroundColor: '#292c33',
          tabBarInactiveBackgroundColor: '#946002',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign name='profile' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        
        <Tab.Screen  name="Europe" component={Europe}
          options={{
          tabBarActiveBackgroundColor: '#292c33',
          tabBarInactiveBackgroundColor: '#946002',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome name='euro' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        <Tab.Screen name="Other World" component={OtherWorld} options={{
          tabBarActiveBackgroundColor: '#292c33',
          tabBarInactiveBackgroundColor: '#946002',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <Fontisto name='world' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
      
      
      </Tab.Navigator>
      
    </NavigationContainer>
  );
};


export default App;

