import React  from "react";
import { StyleSheet,View, Text } from 'react-native';


const MyProfile = () => {
  return (
    <View style={styles.conteiner}>
      <Text>MyProfile!</Text>
    </View>
  );
};


export default MyProfile;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

})