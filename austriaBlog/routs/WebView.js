import React  from "react";
import { StyleSheet,View, Text } from 'react-native';


const WebView = () => {
  return (
    <View style={styles.conteiner}>
      <Text>WebView!</Text>
    </View>
  );
};


export default WebView;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

})