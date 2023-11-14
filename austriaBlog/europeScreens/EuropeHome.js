import React, {useState}  from "react";
import { SafeAreaView,StyleSheet,View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { country } from '../data/country';

const EuropeHome = ({ navigation }) => {
    const [countrys, setCountrys] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log('country==>', country)
    

    return (
        <SafeAreaView style={styles.conteiner}>

            <View style={styles.counryBtnConteier}>
                <ScrollView>
                     <TouchableOpacity
                            onPress={() => { navigation.navigate("AustriaDetails") }}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Austria</Text>
                    </TouchableOpacity>

                    {/**
                    <TouchableOpacity
                            onPress={() => { navigation.navigate("Map") }}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Map</Text>
                    </TouchableOpacity>
                     */}
                    
                    {countrys && (countrys.map((item) =>
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => { navigation.navigate("EuropeDitails", item) }}
                            style={styles.btn}>
                            <Text style={styles.btnText}>{item.name}</Text>
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
                animationType="slide"
                transparent={false}
                visible={isModalVisible}>
                <View>

                    
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(false)}
                        style={styles.btnAddCountry}>
                        <Text style={styles.btnText}>X</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
          
        </SafeAreaView>
    );
};


export default EuropeHome;

const styles = StyleSheet.create({
    conteiner: {
        position: 'relative',
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    counryBtnConteier: {
        marginTop: 50
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
        marginTop: 40,
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: .8,
        elevation: 9,
        borderColor: '#ccc',
    
    },
    btnText: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold'
  
    },
    
    btnAddCountry: {
        position: 'absolute',
        top: 0,
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