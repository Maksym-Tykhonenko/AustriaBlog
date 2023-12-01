import React, {useRef, useState, useEffect}  from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';

import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import appsFlyer from 'react-native-appsflyer';


const WebViewScreen = () => {

  const [idfa, setIdfa] = useState(null);
  const [appsFlyerNaming, setAppsFlyerNaming] = useState(null);
  const [uid, setUid] = useState(null);

  const refWebview = useRef(null);
  

  useEffect(() => {

    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
      )
      .catch((err) => {
        console.log(err);
        return setIdfa(null);
      });
    
    //1ST FUNCTION
    function InitAppsflyer() {
      return new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'USAoqsTaaR8fEMYskDi3w',
            appId: '6472645168',
            isDebug: true,
            onInstallConversionDataListener: true, //Optional
            onDeepLinkListener: true, //Optional
            timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
          },
          resolve,
          reject,
        );
      });
    };
    // Ініціалізація AppsFlyer
    InitAppsflyer()
      .then(() => {
        console.log('AppsFlyer ініціалізовано успішно');
        // Тут ви можете виконувати інші дії після ініціалізації AppsFlyer
      })
      .catch(error => {
        console.error('Помилка ініціалізації AppsFlyer:', error);
      });
    //2
    function getAppsFlyerNaming() {
      return new Promise((resolve, reject) => {
        const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
          res => {
            if (JSON.parse(res.data.is_first_launch) === true) {
              const naming = `${res.data.campaign}_${res.data.af_adset}_${res.data.af_ad}`;
              resolve(naming);
            } else {
              resolve(null)
            }
          }
        );
      });
    }

    getAppsFlyerNaming().then(naming => {
      setAppsFlyerNaming(naming);

    });

    //3
    function GetUIDAppsflyer() {
      return new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
          if (err) {
            reject(err);
          } else {
            // console.log('on getAppsFlyerUID: ' + appsFlyerUID);

            resolve(appsFlyerUID);
          }
        });
      });
    };
    // Отримання UID AppsFlyer
    GetUIDAppsflyer()
      .then(uid => {
        console.log('UID AppsFlyer:', uid);
        // Тут ви можете виконувати інші дії з отриманим UID
        setUid(uid)
      })
      .catch(error => {
        console.error('Помилка отримання UID AppsFlyer:', error);
      });
    
  }, []);

  //const product = `https://reactnative.dev/docs/animated`;
  //const product = `https://joa3.com/MMqDZ5P4?advertising_id=${idfa}`;
  const product = `https://joa3.com/MMqDZ5P4?sub_id1=${appsFlyerNaming}&sub_id2=${idfa}_${uid}`;

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -10 }}>

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

