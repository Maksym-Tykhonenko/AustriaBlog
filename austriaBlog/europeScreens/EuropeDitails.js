import React ,{useState} from "react";
import { StyleSheet,View, Text,TouchableOpacity, ImageBackground, SafeAreaView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { austria } from "../data/austria";

const EuropeDitails = ({ navigation, route }) => {
  // route.params
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [coutry, setCoutry] = useState(route.params)
  const { city, country, description, id, location, name, tips } = coutry;
  console.log('item==>', coutry);

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
        <View style={{ position: 'relative', paddingVertical: 20, paddingHorizontal: 20, flex: 1 }}>
          
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
              <View style={{position: 'relative'}}>
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
          



          <TouchableOpacity
            onPress={() => navigation.navigate('EuropeHome')}
            style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <Ionicons name='arrow-undo-sharp' style={{ color: '#fff', fontSize: 35 }} />
          </TouchableOpacity>
        </View>
       
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

})