import React  from "react";
import { StyleSheet, View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import OtherWorldHome from "../WorldScree/OtherWorldHome";


const OtherWorld = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="OtherWorldHome" component={OtherWorldHome} />
    </Stack.Navigator>
  );
};


export default OtherWorld;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

})