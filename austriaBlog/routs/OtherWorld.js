import React  from "react";
import {StyleSheet, View, Text } from 'react-native';


const OtherWorld = () => {
  return (
    <View style={styles.conteiner}>
      <Text>OtherWorld!</Text>
    </View>
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