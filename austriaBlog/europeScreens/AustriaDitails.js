import React  from "react";
import { StyleSheet,View, Text,TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { austria } from "../data/austria";

const AustriaDitails = ({ navigation }) => {
    console.log(austria)
    return (
        <SafeAreaView style={styles.conteiner}>

            <ImageBackground
                source={require('../accets/backgr.png')}
            >

                <ScrollView style={{ paddingTop: 40, }}>
                
                    {austria.map(({ id, city, name, description, location, admission, tips, photo, latitude, longitude }) =>
                        <View
                            key={id}
                            style={{ margin: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => navigation.navigate('AustriaCityDetails', { city, name, description, location, admission, tips, photo, latitude,longitude })}
                                >
                                    <Text style={styles.btnText}>{city}</Text>
                                </TouchableOpacity>
                       
                            </View>
            
                        </View>
                    )}
                </ScrollView>

                {/**BtnBack */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('EuropeHome')}
                    style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Ionicons name='arrow-undo-sharp' style={{ color: '#fff', fontSize: 35 }} />
                </TouchableOpacity>
            </ImageBackground>

        </SafeAreaView>
    );
};


export default AustriaDitails;

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: "#fff",
   
        position: 'relative'
    },
    btn: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 50,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: .8,
        elevation: 9,
        borderColor: '#ccc',
    
    },
    btnText: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
  
    },
});