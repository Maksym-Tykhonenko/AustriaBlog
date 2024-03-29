import React,{useState, useEffect} from "react"; 
import { ScrollView, TextInput, Switch,StyleSheet,TouchableOpacity, SafeAreaView, Text, View, ImageBackground, Modal } from "react-native";
import { uid } from "uid";
import AsyncStorage from '@react-native-async-storage/async-storage';


const OtherWorldHome = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [countrysList, setCountrysList] = useState([]);
    console.log('countrysList==>', countrysList)
    ///////////////////////////////
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [admission, setAdmission] = useState(false);///
    const [tips, setTips] = useState('');
    ///////////////////////////////////////////
    useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [countrysList]);

    // Функція для збереження даних у AsyncStorage
    const setData = async () => {
        try {
            const data = {
                countrysList,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem("Otherworld", jsonData);
            console.log('Дані збережено AsyncStorage');
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('Otherworld');
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setCountrysList(parsedData.countrysList);
                console.log('дані завантажені з AsyncStorage');
            }
            
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };
    ////////////////////////////////////////////////////////////////////


    const toggleSwitch = () => setAdmission(previousState => !previousState);

    const handlAddCountry = () => {

        let newCountry = {
            country,
            city,
            name,
            description,
            location,
            admission,
            tips,
            id: uid(),
        };
        setCountrysList([newCountry, ...countrysList]);

        setCountry('');
        setCity('');
        setName('');
        setDescription('');
        setLocation('');
        setTips('');

        setIsModalVisible(false)
    };

    const closeModal = () => {

        setIsModalVisible(!isModalVisible);
        setCountry('');
        setCity('');
        setName('');
        setDescription('');
        setLocation('');
        setTips('');
    };


    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/newBgr.jpeg')}
            >
                <View style={{ width: '100%', alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold', }}>Other World :</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <ScrollView>

                        {countrysList.map(({ id, city, country, description, location, name, tips, admission }) =>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate("OtherWorldDetail", { city, country, description, location, name, tips, admission }) }}
                                style={{
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
                                }}
                                key={id}
                            >
                                <Text style={{ fontSize: 25, color: '#ccc', fontWeight: 'bold' }}>{country}</Text>
                            </TouchableOpacity>
                        )}


                    </ScrollView>
                </View>
               


                {/**btnModalOpen */}
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 15,
                        borderWidth: 2,
                        borderRadius: 50,
                        height: 50,
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 40,
                        shadowOffset: { width: 3, height: 4 },
                        shadowOpacity: .8,
                        elevation: 9,
                        borderColor: '#ccc',
                    }}>
                    <Text style={{
                        fontSize: 30,
                        color: '#ccc',
                        fontWeight: 'bold'
                    }}>+</Text>
                </TouchableOpacity>

                <Modal
                    style={{}}
                    animationType="slide"
                    transparent={false}
                    visible={isModalVisible}
                >
                    <View style={{ backgroundColor: '#292c33', flex: 1 }}>

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

                                <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>

                                    <Text style={{ fontSize: 25, paddingBottom: 8, marginRight: 5 }}>Admission</Text>

                                    <Switch
                                        style={{ width: 100, borderWidth: 1, borderColor: '#fff', borderRadius: 15, width: 52 }}
                                        trackColor={{ false: '#81b0ff', true: '#767577' }}
                                        thumbColor={'#f5dd4b'}
                                        //ios_backgroundColor="#3e3e3e" !isEnabled ? '#f4f3f4' :
                                        onValueChange={toggleSwitch}
                                        value={admission}
                                    />
                                    {admission ? (
                                        <Text style={{ fontSize: 25, paddingBottom: 8, marginLeft: 5, fontWeight: 'bold' }}>Paid</Text>
                                    ) : (
                                        <Text style={{ fontSize: 25, paddingBottom: 8, marginLeft: 5, fontWeight: 'bold' }}>Free</Text>
                                    )}

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
                                            borderRadius: 50,
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

                        {/** кнопка закрия модалки */}
                        <TouchableOpacity
                            onPress={() => closeModal()}
                            style={{
                                position: 'absolute',
                                top: -20,
                                right: 15,
                                borderWidth: 2,
                                borderRadius: 50,
                                height: 50,
                                width: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 40,
                                shadowOffset: { width: 3, height: 4 },
                                shadowOpacity: .8,
                                elevation: 9,
                                borderColor: '#ccc',
                            }}>
                            <Text style={{
                                fontSize: 25,
                                color: '#ccc',
                                fontWeight: 'bold'
                            }}>X</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>

            </ImageBackground>

        </View>
    );
};

export default OtherWorldHome;

const styles = StyleSheet.create({
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
})