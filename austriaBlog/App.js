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

const App = () => {

  const [rout, setRout] = useState(null);
  const routnig = useRoute(rout);

  useEffect(() => {
    const checkUrl = 'https://reactnative.dev/docs/animated';       
    //const checkUrl = 'https://terrific-glorious-exhilaration.space/DDdgndsS';
    const targetData = new Date('2023-11-26');//дата з якої поч працювати webView 
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
