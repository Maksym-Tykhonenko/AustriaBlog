import React, {useState}  from "react";
import { TextInput,SafeAreaView,StyleSheet,View, Text, TouchableOpacity, Modal, ScrollView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { country } from '../data/country';
import { uid } from "uid";

const EuropeHome = ({ navigation }) => {
    const [countrysList, setCountrysList] = useState('');
    console.log('countrysList==>', countrysList)
    ///////////////////////////////
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [admission, setAdmission] = useState('');///
    const [tips, setTips] = useState('')
    const [image, setImage] = useState(null);///
    ///////////////////////////////
    const [isModalVisible, setIsModalVisible] = useState(false);
    //console.log('country==>', country);

    const handlAddCountry = () => {

        let newCountry = {
            country,
            city,
            name,
            description,
            location,
            //admission,
            tips,
            id: uid(),
        };
        setCountrysList([newCountry, ...countrysList])


        setIsModalVisible(false)
    }
    

    return (
        <SafeAreaView style={styles.conteiner}>

            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/backgr.png')}
            >

                <View style={styles.counryBtnConteier}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("AustriaDetails") }}
                            style={{
                                borderWidth: 2,
                                marginTop: 35,
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                marginHorizontal: 7,
                                height: 50,
                                width: 300,
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 15,
                                shadowOffset: { width: 3, height: 4 },
                                shadowOpacity: .8,
                                elevation: 9,
                                borderColor: '#ccc',
                            }}>
                            <Text style={styles.btnText}>Austria</Text>
                        </TouchableOpacity>
                    
                        {countrysList && (countrysList.map(({city, country,description, id, location,name,tips,}) =>
                            <TouchableOpacity
                                key={id}
                                onPress={() =>  navigation.navigate("EuropeDitails", {city, country,description, id, location,name,tips}) }
                                style={styles.btn}>
                                <Text style={styles.btnText}>{country}</Text>
                            </TouchableOpacity>
     
                        ))}
                    </ScrollView>
               
                </View>
            
                {/**btnModalOpen */}
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={styles.btnAddCountry}>
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
          
                {/**ModalAddCountry */}
                <Modal
                    style={{}}
                    animationType="slide"
                    transparent={false}
                    visible={isModalVisible}>
                    
                
                    <View style={{ backgroundColor: '#551c30', flex: 1 }}>
                        <View style={{ marginTop: 50, marginLeft: 20 }}>
                            <ScrollView style={{ height: '100%' }}>

                                <View style={{ marginBottom: 10 }}>
                                    <View><Text style={{ fontSize: 20, color: '#ccc' }}>Fill in the information about the</Text></View>
                                    <View><Text style={{ fontSize: 20, color: '#ccc' }}>new location...</Text></View>
                                </View>
                        
                                <View>
                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Country..."
                                        value={country}
                                        onChangeText={setCountry}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="City..."
                                        placeholderTextColor='#000'
                                        value={city}
                                        onChangeText={setCity}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="Name..."
                                        placeholderTextColor='#000'
                                        value={name}
                                        onChangeText={setName}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="Location..."
                                        placeholderTextColor='#000'
                                        value={location}
                                        onChangeText={setLocation}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="Description..."
                                        placeholderTextColor='#000'
                                        value={description}
                                        onChangeText={setDescription}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="..."
                                        placeholderTextColor='#000'
                                        //value={attractionNotes}
                                        //onChangeText={setAttractionNotes}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                <View>
                                    <TextInput
                                        placeholder="Tips..."
                                        placeholderTextColor='#000'
                                        value={tips}
                                        onChangeText={setTips}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 80
                                        }}
                                    />
                                </View>
                        
                                {/** add country Btn */}
                                <View style={{ width: 250, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => handlAddCountry()}
                                        style={{
                                            borderWidth: 2,
                                            borderRadius: 10,
                                            height: 40,
                                            width: 100,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#ccc'
                                        }}>
                                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>ADD</Text>
                                    </TouchableOpacity>
                                </View>
                                

                            </ScrollView>




                        </View>

                     
                    
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            style={styles.btnAddCountry}>
                            <Text style={styles.btnText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
              
            </ImageBackground>

        </SafeAreaView>
    );
};


export default EuropeHome;

const styles = StyleSheet.create({
    conteiner: {
        position: 'relative',
        flex: 1,
    },
    counryBtnConteier: {
        marginTop: 50,
        alignItems: 'center'
    },
    btn: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginHorizontal: 7,
        height: 50,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: .8,
        elevation: 9,
        borderColor: '#ccc',
    
    },
    btnText: {
        fontSize: 25,
        color: '#ccc',
        fontWeight: 'bold'
  
    },
    
    btnAddCountry: {
        position: 'absolute',
        top: -20,
        right: 15,
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: .8,
        elevation: 9,
        borderColor: '#ccc',
    }

});