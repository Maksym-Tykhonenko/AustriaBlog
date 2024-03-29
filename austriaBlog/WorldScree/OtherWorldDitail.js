import React ,{useState,useEffect} from "react";
import { TextInput,StyleSheet,View, Text,TouchableOpacity, ImageBackground, SafeAreaView, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker, Circle } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';



const OtherWorldDitail = ({ navigation, route }) => {
    const [selectPhoto, setSelectPhoto] = useState(null);
    const [coutry, setCoutry] = useState(route.params);
    console.log('coutry==>', coutry)
    const { city, description, location, name, tips, admission } = coutry;
    ///////////////////////////////////////////
    useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [selectPhoto]);

    // Функція для збереження даних у AsyncStorage
    const setData = async () => {
        try {
            const data = {
                selectPhoto,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`OtherWorldDitail${city}`, jsonData);
            console.log('Дані збережено AsyncStorage');
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`OtherWorldDitail${city}`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhoto(parsedData.selectPhoto);
                console.log('дані завантажені з AsyncStorage');
            }
            
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };

    ////////////////////////////////////////////////////////////////////
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
        <View style={{ flex: 1, position: 'relative' }}>

            <ImageBackground
                source={require('../accets/newBgr.jpeg')}
                style={{ flex: 1 }}>
                <ScrollView>

                    <View style={{ position: 'relative', paddingVertical: 50, paddingHorizontal: 20, flex: 1 }}>
                
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
                            

                        {/** Map */}
                        <MapView
                            style={{ flex: 1, height: 200, marginBottom: 50, borderRadius: 10 }}
                            initialRegion={{
                                latitude: 41.805543352469535,
                                longitude: -87.65524836742965,
                                latitudeDelta: 45.8922,
                                longitudeDelta: 0.9421,
                            }}
                        />

                    </View>

                </ScrollView>

                <TouchableOpacity
                    onPress={() => navigation.navigate('OtherWorldHome')}
                    style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Ionicons name='arrow-undo-sharp' style={{ color: '#fff', fontSize: 35 }} />
                </TouchableOpacity>

            </ImageBackground>
            
           
        </View>
    );
};
// descriptionSubCont: { marginBottom: 5

export default OtherWorldDitail;

const styles = StyleSheet.create({
 
  descriptionSubCont: {
    marginBottom: 5
  }

})