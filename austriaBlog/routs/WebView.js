import React, {useRef, useState, useEffect}  from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';

import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import appsFlyer from 'react-native-appsflyer';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/**
получить разрешение на пуши - > 

инициализировать аппсфлаер - > 

получить нейминг от апсфлаера -> 

прикрепить этот нейминг к ссылке в sub_id_1,2,3 в формате «саб1_саб2_саб3»

получить рекламный айди девайса и апсфлаер айди юзера

прикрепить их к ссылке в последующие саб айди

открыть вебвью.
*/}


const WebViewScreen = ({ route }) => {

  const appsFlyerUID = route.params?.appsFlyerUID;
  const appsFlyerNaming = route.params?.appsFlyerNaming;
  const advertasingId = route.params?.advertasingId;

  const [idfa, setIdfa] = useState(advertasingId);
  //const [url, setUrl] = useState(null);
  const [uid, setUid] = useState(appsFlyerUID);
  const refWebview = useRef(null);
  /////  
  let link = `https://jewelllbell.space/MMqDZ5P4?`;
  const [prodLink, setProdLink] = useState(link);

  //console.log('38 WV prodLink==>', prodLink);

    useEffect(() => {
    getData();
  }, []);

   useEffect(() => {
    setData()
  }, [ prodLink, idfa, uid])
  ,
 {/** 
  useEffect(() => {
  
    generateLink(appsFlyerNaming);
    
  }, []);*/}

  console.log(' WV appsFlyerNaming==>', appsFlyerNaming)
  
  {/** 
  //idfa
  useEffect(() => {

    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
        console.log('55idfa==>', idfa)
      )
      .catch((err) => {
        console.log(err);
        return setIdfa(null);
      });
    
  }, []);
*/}


  function generateLink(naming) {
    
        
        if (naming) {

          const parts = naming.split('_');

          if (parts.length > 1) {
            parts.forEach((part, index) => {
              setProdLink(link += `sub_id_${index + 1}=${part}&`)
              //setData();
              console.log(' WV консоль в parts.length > 1')
            })
          } else {
            setProdLink(link += `sub_id_1=${naming}&`);
            //setData();
            console.log(' WV консоль в parts.length > 1 ЕЛС')
            
          }
          
        } else if(naming === null) {
          getData();
            console.log(' WV консоль в  ЕЛС іф')

          return
        }
        //console.log('104prodLink==>', prodLink)
        //return prodLink;

  };


  // Функція для збереження даних у AsyncStorage
  const setData = async () => {
    try {
      const data = {
        prodLink,
        idfa,
        uid,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("prodLinkData", jsonData);
      console.log('Дані збережено in WebViewScreen AsyncStorage');
    } catch (e) {
      console.log(' WV Помилка збереження даних prodLinkData:', e);
    }
  };

  // Функція для доставання даних у AsyncStorage
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('prodLinkData');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);

        console.log('parsedData in WebViewScreen==>', parsedData);
        setProdLink(parsedData.prodLink);
        setIdfa(parsedData.idfa);
        setUid(parsedData.uid);

        console.log('дані завантажені  in WebViewScreen з AsyncStorage');

      } else {
        generateLink(appsFlyerNaming);
      }
            
    } catch (e) {
      console.log(' WV Помилка отримання даних:', e);
    }
  };

  {/** 
  useEffect(() => {
    getOtherData();
  }, []);

   useEffect(() => {
    setOtherData()
  }, [idfa, uid])
*/}
  //const product = `https://reactnative.dev/docs/animated`;
  //
  const product = `${prodLink}ad_id=${idfa}&apps_id=${uid}`;
  console.log(' WV product', product)

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191d24'}}>
      
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

