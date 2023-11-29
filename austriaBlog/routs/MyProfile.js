import React ,{useState, useEffect} from "react";
import {ImageBackground,TouchableOpacity,TextInput, StyleSheet,View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from 'uid';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyProfile = () => {
  const [writingUsername, setWritingUsername] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [showWriteAttractionsBlock, setShowWriteAttractionsBlock] = useState(false);
  ////////
  const [selectedData, setSelectedData] = useState('');
  const [city, setCity] = useState('')
  const [attraction, setAttraction] = useState('');
  const [attractionAddres, setAttractionAddres] = useState('');
  const [attractionNotes, setAttractionNotes] = useState('');
  ////////
  const [attractionList, setAttractionList] = useState('')
  //console.log('attraction==>', attraction);
  //console.log('attractionAddres==>', attractionAddres);
  console.log('attractionList==>', attractionList);

  ///////////////////////////////////////////
  useEffect(() => {
    getData(); // дані завантажені з AsyncStorage
  }, []);

  useEffect(() => {
    setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
  }, [username, avatar, attractionList]);

  // Функція для збереження даних у AsyncStorage
  const setData = async () => {
    try {
      const data = {
        username,
        avatar,
        attractionList,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("MyProfile", jsonData);
      console.log('Дані збережено AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('MyProfile');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAvatar(parsedData.avatar);
        setUsername(parsedData.username);
        setAttractionList(parsedData.attractionList);
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
        setAvatar(response.assets[0].uri);

      } else {
        console.log('Вибір скасовано');
      }
    });
  };
  
  const hadleAttractioSave = () => {
    let newAttraction = {
      data: selectedData,
      city,
      name: attraction,
      addres: attractionAddres,
      notes: attractionNotes,
      id: uid(),
    };

    setAttractionList([newAttraction, ...attractionList]);
    setAttraction('');
    setAttractionAddres('');
    setAttractionNotes('');
    setCity('');
    setSelectedData('');

    setShowWriteAttractionsBlock(false)
  };

  //<Text style={{ fontSize: 25, color: '#000' }}>Save</Text>
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>

      <ImageBackground
        style={{ flex: 1 }}
        source={require('../accets/backgr.png')}
      >
        <ScrollView style={{ marginHorizontal: 20, marginTop: 40 }}>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={{ marginRight: 15 }}>
         
              {/** name Block */}
              <View style={styles.usernameBlock}>

                {username ? (
                  <View><Text style={{ marginBottom: 10, fontSize: 35, fontWeight: 'bold', color: '#fff' }}>{username}</Text></View>
                ) : (
                  <View style={{ marginBottom: 15, }}>
                    <Text style={{ marginLeft: 5, marginBottom: 10, fontWeight: 'bold', fontSize: 25, color: '#fff' }}>Add name :</Text>
                    <View style={{ position: 'relative', width: 250, }}>
                      <TextInput
                        placeholderTextColor='#000'
                        placeholder="Name..."
                        value={writingUsername}
                        onChangeText={setWritingUsername}
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#fff', borderRadius: 10, width: 250, height: 40
                        }}
                      />
                      <TouchableOpacity
                        style={styles.btnName}
                        onPress={() => setUsername(writingUsername)}
                      >
                        <AntDesign name='check' style={{ color: '#fff', fontSize: 30 }} />
                    
                      </TouchableOpacity>
                    </View>
                  
                  </View>
                )}
              </View>

              {/**Add PhotoBlock */}
              {avatar ? (
                <View style={{ ...styles.photoBlock, position: 'relative', width: 150, marginBottom: 15 }}>
                  <Image source={{ uri: avatar }} style={{ width: 150, height: 150, borderRadius: 150 }} />
              
                  <TouchableOpacity
                    onPress={() => ImagePicer()}
                    style={{ position: 'absolute', bottom: 5, right: 5, borderWidth: 1, borderRadius: 150, borderColor: '#fff', backgroundColor: '#fff' }}
                  >
                    <Entypo name='circle-with-plus' style={{ color: '#3157c9', fontSize: 35 }} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ ...styles.photoBlock, position: 'relative', width: 150, marginBottom: 15 }}>
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={require('../accets/user.png')} />

                  <TouchableOpacity
                    onPress={() => ImagePicer()}
                    style={{ position: 'absolute', bottom: 5, right: 5, borderWidth: 1, borderRadius: 150, borderColor: '#fff', backgroundColor: '#fff' }}
                  >
                    <Entypo name='circle-with-plus' style={{ color: '#3157c9', fontSize: 35 }} />
                  </TouchableOpacity>

                </View>
              )}
          
              {/** writeAttractionsBlock */}
              <View style={styles.attractionsBlock}>

                {!showWriteAttractionsBlock ? (
                  <TouchableOpacity
                    onPress={() => { setShowWriteAttractionsBlock(true) }}
                    style={styles.btnNewPlase}
                  >
                    <Text style={{ fontSize: 25, color: '#fff' }}>Add new place{' '}
                      <AntDesign name='arrowdown' style={{ color: '#fff', fontSize: 30 }} />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ marginBottom: 15, position: 'relative' }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => { setShowWriteAttractionsBlock(false) }}
                        style={{
                          position: 'absolute', right: 0,
                          borderRadius: 50,
                          height: 40,
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          borderWidth: 1,
                          borderColor: '#36212c',
                          backgroundColor: '#36212c'
                        }}
                      >
                        <AntDesign name='close' style={{ color: '#fff', fontSize: 24 }} />
                      </TouchableOpacity>
                      
                      <TextInput
                        placeholderTextColor='#000'
                        placeholder="City..."
                        value={city}
                        onChangeText={setCity}
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#fff', borderRadius: 10, width: 250, height: 40
                        }}
                      />
                    </View>
                    
                    <View>
                      <TextInput
                        placeholder="Attraction..."
                        placeholderTextColor='#000'
                        value={attraction}
                        onChangeText={setAttraction}
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#fff', color: '#fff', borderRadius: 10, width: 250, height: 40
                        }}
                      />
                    </View>

                    <View>
             
                      <TextInput
                        placeholderTextColor='#000'
                        placeholder="Attraction address..."
                        value={attractionAddres}
                        onChangeText={setAttractionAddres}
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          borderColor: '#fff', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, color: '#fff', borderRadius: 10, width: 250, height: 40
                        }}
                      />
                    </View>

                    <View>
             
                      <TextInput
                        placeholderTextColor='#000'
                        placeholder="Notes about..."
                        value={attractionNotes}
                        onChangeText={setAttractionNotes}
                        multiline={true}
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          borderColor: '#fff', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 80
                        }}
                      />
                    </View>
                  
                    {/**Caledar */}
                    <View>
                      <Calendar
                        style={{
                          shadowOffset: { width: 3, height: 4 },
                          shadowOpacity: .8,
                          elevation: 9,
                          borderColor: '#ccc', marginBottom: 15, borderRadius: 10,
                        }}
                        onDayPress={day => {
                          setSelectedData(day.dateString);
                        }}
                        markingType={'custom'}
                        markedDates={{
                          [selectedData]: {
                            customStyles: { container: { backgroundColor: '#33d33f', elevation: 2 }, text: { color: '#000' } }
                        
                          }
                        }}
                      />
                    </View>

                    <View style={{ alignItems: 'center', width: 250 }}>
                      <TouchableOpacity
                        style={styles.btnSaveAttraction}
                        onPress={() => hadleAttractioSave()}
                      >
                        <Text style={{ fontSize: 25, color: '#fff' }}>Save</Text>
                      </TouchableOpacity>
                    </View>
                

                  </View>
                )}

              </View>

              {/** tripList*/}
              <View style={{
                ...styles.tripList, marginTop: 20, shadowOffset: { width: 3, height: 4 },
                shadowOpacity: .8,
                elevation: 9,
                borderColor: '#ccc',
              }}>
              
                {!attractionList ? (
                  <Text></Text>
                ) : (
                  attractionList.map((trip) => {
                    return (
                      <View
                        style={{ marginBottom: 8, backgroundColor: '#8c1633', padding: 10, borderRadius: 15, }}
                        key={trip.id}
                      >
                        <Text style={{ color: '#043870' }}>{trip.data}</Text>
                        <Text style={{ color: '#043870' }}>City: <Text style={{ color: '#000' }}>{trip.city}</Text></Text>
                        <Text style={{ color: '#043870' }}>Name: <Text style={{ color: '#000' }}>{trip.name}</Text></Text>
                        <Text style={{ color: '#043870' }}>Location: <Text style={{ color: '#000' }}>{trip.addres}</Text></Text>
                        <Text style={{ color: '#043870' }}>Description: <Text style={{ color: '#000' }}>{trip.notes}</Text></Text>

                      </View>
                    )
                  })
                )}
              </View>

            </View>

          </KeyboardAvoidingView>

        </ScrollView>
      </ImageBackground>
    </View>
  );
};


export default MyProfile;

const styles = StyleSheet.create({
  conteiner: {
    
  },
  btnName: {
    position: 'absolute',
    right: 0,
    marginLeft: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Колір тіні на iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  btnNewPlase: {
    marginLeft: 4,
    //marginBottom: 15,
    borderColor: '#36212c',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#36212c',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Колір тіні на iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  btnSaveAttraction: {
    marginLeft: 4,
    backgroundColor: '#36212c',
    borderColor: '#36212c',
    borderRadius: 30,
    borderWidth: 1,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Колір тіні на iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  }
});