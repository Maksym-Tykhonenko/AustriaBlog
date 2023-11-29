import React, {useRef, useState, useEffect}  from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';



const WebViewScreen = () => {

  const product = `https://reactnative.dev/docs/animated`;
  const refWebview = useRef(null);

  //ф-ція для повернення назад
  const goBack = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPage = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191d24' }}>
      <WebView
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        source={{ uri: product }}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{ flex: 1, marginBottom: 7 }}
        ref={refWebview}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

        <TouchableOpacity
          style={{ marginLeft: 40 }}
          onPress={goBack}>
          <AntDesign name="left" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginRight: 40, }}
          onPress={reloadPage}>
          <AntDesign name="reload1" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>
                
      </View>

    </SafeAreaView>
  );
};


export default WebViewScreen;

