import React ,{useState, useEffect} from "react";
import { StyleSheet,View, Text,TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground } from 'react-native';

import { uid } from 'uid';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker, Circle } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { austria } from "../data/austria";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AustriaCityDitails = ({ navigation, route }) => {
   
    const [coutrycoutry, setCoutryCoutry] = useState(route.params)
    const { latitude, longitude, city, name, description, location, admission, tips, photo } = coutrycoutry;
    const [selectPhotoselectPhoto, setSelectPhotoSelectPhoto] = useState(null);

    useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [selectPhotoselectPhoto]);

    // Функція для збереження даних у AsyncStorage
    const setData = async () => {
        try {
            const data = {
                selectPhotoselectPhoto,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`AustriaCityDitails${city}`, jsonData);
            console.log('Дані збережено AsyncStorage');
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`AustriaCityDitails${city}`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhotoSelectPhoto(parsedData.selectPhotoselectPhoto);
                console.log('дані завантажені з AsyncStorage');
            }
            
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };
    

    
    const ImagePicerImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                console.log('response==>', response.assets[0].uri);
                
                //const newSelectedPhotos = [...selectPhotoselectPhoto, { sel: response.assets[0].uri }];
                //console.log('newSelectedPhotos==>', newSelectedPhotos)
                setSelectPhotoSelectPhoto(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };
    

  

    return (

        <View style={{ ...styles.conteiner, flex: 1 }}>

            <ImageBackground
                style={{flex:1}}
                source={require('../accets/newBgr.jpeg')}
            >

            <ScrollView style={{ paddingTop: 40,paddingHorizontal:20, flex: 1 }}>
                <View style={styles.scrollView}>
                    {photo.map((item) => {
                        const index = photo.indexOf(item)
                        return (
                            <Image
                                key={uid()}
                                style={{
                                    width: index === 0 ? '100%' : '48%',
                                    height: index === 0 ? 200 : 100,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                    resizeMode: 'cover',
                                    
                                    
                            
                                }}
                                source={item.pict} />
                
                        )
                    })}
                     
                    {selectPhotoselectPhoto &&
                        <Image
                            style={{ width: '48%', height: 100, borderRadius: 10, }}
                            source={{ uri: selectPhotoselectPhoto }} />
                    }
                   
                    <TouchableOpacity
                        onPress={() => {
                            ImagePicerImagePicer()
                        }}
                        style={styles.addPhotoBtn}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff'}}>+ add photo</Text>
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.descriptionSubCont}><Text style={{ fontWeight: 'bold',color: '#fff' }}>City: <Text style={{ fontWeight: 'normal' }}>{city}</Text></Text></View>
                <View style={styles.descriptionSubCont}><Text style={{ fontWeight: 'bold',color: '#fff' }}>Name: <Text style={{ fontWeight: 'normal' }}>{name}</Text></Text></View>
                <View style={styles.descriptionSubCont}><Text style={{ fontWeight: 'bold',color: '#fff' }}>Location: <Text style={{ fontWeight: 'normal' }}>{location}</Text></Text></View>
                <View style={styles.descriptionSubCont}><Text style={{ fontWeight: 'bold',color: '#fff' }}>Description: <Text style={{ fontWeight: 'normal' }}>{description}</Text></Text></View>
                <View style={styles.descriptionSubCont}><Text style={{ fontWeight: 'bold',color: '#fff' }}>Admission: <Text style={{ fontWeight: 'normal' }}>{admission}</Text></Text></View>
                <View style={{ marginBottom: 30 }}><Text style={{ fontWeight: 'bold',color: '#fff' }}>Tips: <Text style={{ fontWeight: 'normal' }}>{tips}</Text></Text></View>
              
                {/** Map */}
                <MapView
                    style={{ flex: 1, height: 200, marginBottom: 50, borderRadius: 10 }}
                    initialRegion={{
                        latitude: latitude ,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                
            </ScrollView>

            {/**BtnBack */}
            <TouchableOpacity
                onPress={() => navigation.navigate('AustriaDetails')}
                style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <Ionicons name='arrow-undo-sharp' style={{ color: '#fff', fontSize: 35 }} />
            </TouchableOpacity>
</ImageBackground>

        </View>
    );
};


export default AustriaCityDitails;

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        //marginHorizontal: 20,
        position: 'relative'
    },
    scrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
       
    },
    addPhotoBtn: {
        borderWidth: 2,
        borderRadius: 10,
        height: 98,
        width: '46%',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginRight: 8,
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.8,
        elevation: 9,
        borderColor: '#ccc',
    },
    descriptionSubCont: {
        marginBottom: 5
    }
        
});