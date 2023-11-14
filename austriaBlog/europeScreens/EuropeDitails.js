import React  from "react";
import { StyleSheet,View, Text,TouchableOpacity } from 'react-native';

import { austria } from "../data/austria";

const EuropeDitails = ({navigation}) => {
  return (
    <View style={styles.conteiner}>
      <Text>EuropeDitails!</Text>
      <TouchableOpacity
                onPress={() => navigation.navigate('EuropeHome')}
                style={{position: 'absolute',bottom: 10, right: 10}}>
        <Text style={{fontWeight: 'bold'}}>{ `<==`}</Text>
            </TouchableOpacity>
    </View>
  );
};


export default EuropeDitails;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  },

})