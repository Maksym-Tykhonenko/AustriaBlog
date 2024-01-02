import React, {useState, useEffect}  from "react";
import { SafeAreaView,StyleSheet,View, Text, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import EuropeHome from "../europeScreens/EuropeHome";
import EuropeDitails from "../europeScreens/EuropeDitails";
import AustriaDitails from "../europeScreens/AustriaDitails";
import AustriaCityDitails from "../europeScreens/AustriaCityDitails";
import Map from "../europeScreens/Map";

const Europe = ({ route }) => {
 

  return (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="EuropeHome" component={EuropeHome} />
      <Stack.Screen options={{ headerShown: false }} name="EuropeDitails" component={EuropeDitails} />
      <Stack.Screen options={{ headerShown: false }} name="AustriaDetails" component={AustriaDitails} />
      <Stack.Screen options={{ headerShown: false }} name="AustriaCityDetails" component={AustriaCityDitails} />
      <Stack.Screen options={{ headerShown: false }} name="Map" component={Map} />
    </Stack.Navigator>
  );
 
};


export default Europe;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: .8,
    elevation: 9,
    borderColor: '#ccc',
    
  },
  btnText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'
  
  },

});