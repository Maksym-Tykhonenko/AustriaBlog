import React ,{useState} from "react";
import { TextInput,StyleSheet,View, Text,TouchableOpacity, ImageBackground, SafeAreaView, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker, Circle } from 'react-native-maps';

import { austria } from "../data/austria";

const EuropeDitails = ({ navigation, route }) => {
  // route.params
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [coutry, setCoutry] = useState(route.params)
  const { city, description, location, name, tips , admission} = coutry;

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  console.log('latitude longitude==>', latitude, longitude);

  const ImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                console.log('response==>', response.assets[0].uri);
                
                //const newSelectedPhotos = [...selectPhoto, { sel: response.assets[0].uri }];
                //console.log('newSelectedPhotos==>', newSelectedPhotos)
                setSelectPhoto(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };


  return (
    <SafeAreaView style={styles.conteiner}>

      <ImageBackground
        style={{ flex: 1 }}
        source={require('../accets/backgr.png')}
      >
        
        <ScrollView>
          <View style={{ position: 'relative', paddingVertical: 20, paddingHorizontal: 20, flex: 1 }}>
          
            <View style={{ marginBottom: 15 }}>
              {!selectPhoto ? (
                <TouchableOpacity
                  onPress={() => { ImagePicer() }}
                  style={{
                    width: '100%',
                    height: 200, borderWidth: 2,
                    borderRadius: 10, justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    marginRight: 8,
                    shadowOffset: { width: 3, height: 4 },
                    shadowOpacity: 0.8,
                    elevation: 9,
                    borderColor: '#ccc',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 30 }}>Add Photo +</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ position: 'relative' }}>
                  <Image
                    style={{
                      width: '100%',
                      height: 200,
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: '#ccc',
                    }}
                    source={{ uri: selectPhoto }} />
                
                  <TouchableOpacity
                    onPress={() => { ImagePicer() }}
                    style={{ position: 'absolute', right: -15, bottom: -15, backgroundColor: '#fff', borderRadius: 50 }}>
                    <MaterialIcons name='published-with-changes' style={{ color: '#3157c9', fontSize: 45 }} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{ marginBottom: 15 }}>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>City: <Text style={{ fontWeight: 'normal' }}>{city}</Text></Text>
              </View>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>name: <Text style={{ fontWeight: 'normal' }}>{name}</Text></Text>
              </View>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Location: <Text style={{ fontWeight: 'normal' }}>{location}</Text></Text>
              </View>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Description: <Text style={{ fontWeight: 'normal' }}>{description}</Text></Text>
              </View>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Admission: {admission ? (
                  <Text style={{ fontWeight: 'normal' }}>Paid</Text>
                ) : (
                  <Text style={{ fontWeight: 'normal' }}>Free</Text>
                )}
                </Text>
              </View>

              <View style={styles.descriptionSubCont}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Tips: <Text style={{ fontWeight: 'normal' }}>{tips}</Text></Text>
              </View>
           

            </View>
            {/**
            <View>

              <TextInput
                placeholderTextColor='#000'
                placeholder="latitude..."
                value={latitude}
                onChangeText={setLatitude}
                multiline={true}
                style={{
                  shadowOffset: { width: 3, height: 4 },
                  shadowOpacity: .8,
                  elevation: 9,
                  borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                }}
              />
              
              <TextInput
                placeholderTextColor='#000'
                placeholder="longitude..."
                value={longitude}
                onChangeText={setLongitude}
                multiline={true}
                style={{
                  shadowOffset: { width: 3, height: 4 },
                  shadowOpacity: .8,
                  elevation: 9,
                  borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                }}
              />
            </View> */}

            {/** Map */}
            <MapView
              style={{ flex: 1, height: 200, marginBottom: 50, borderRadius: 10 }}
              initialRegion={{
                latitude: 48.201103109969424,
                longitude: 15.634827092988447,
                latitudeDelta: 6.8922,
                longitudeDelta: 0.9421,
              }}
            />

          
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('EuropeHome')}
          style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <Ionicons name='arrow-undo-sharp' style={{ color: '#fff', fontSize: 35 }} />
        </TouchableOpacity>
       
      </ImageBackground>
      
    </SafeAreaView>
  );
};


export default EuropeDitails;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    position: 'relative'
  },
  descriptionSubCont: {
    marginBottom: 5
  }

})