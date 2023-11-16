import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, View, Text } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Europe from "./routs/Europe";
import OtherWorld from "./routs/OtherWorld";
import MyProfile from "./routs/MyProfile";
import WebView from "./routs/WebView";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//world

const useRoute = (isFatch) => {
  if (isFatch) {
    return (
      <Stack.Navigator >
        <Stack.Screen name="WebView" component={WebView} />
      </Stack.Navigator>
    )
  } return (
    <Tab.Navigator initialRouteName='Europe' screenOptions={{
      tabBarShowLabel: true,
      headerShown: false,
    }}>
      
      <Tab.Screen name="My Profile" component={MyProfile} options={{
        tabBarActiveBackgroundColor: '#36212c',
        tabBarInactiveBackgroundColor: '#8c1633',
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <AntDesign name='profile' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
        
      <Tab.Screen name="Europe" component={Europe} options={{
        tabBarActiveBackgroundColor: '#36212c',
        tabBarInactiveBackgroundColor: '#8c1633',
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <FontAwesome name='euro' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
      <Tab.Screen name="Other World" component={OtherWorld} options={{
        tabBarActiveBackgroundColor: '#36212c',
        tabBarInactiveBackgroundColor: '#8c1633',
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <Fontisto name='world' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
      
      
    </Tab.Navigator>
  )
};

const App = () => {

  const rout = useRoute(false)

  return (
    <NavigationContainer>
      {rout}
    </NavigationContainer>
  );
};


export default App;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

})
