import React  from "react";
import { StyleSheet,View, Text,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { austria } from "../data/austria";

const AustriaDitails = ({ navigation }) => {
    console.log(austria)
    return (
        <SafeAreaView style={styles.conteiner}>

            <ScrollView style={{ paddingTop: 40, }}>
                
                {austria.map(({ id, city, name, description, location, admission, tips , photo}) =>
                    <View
                        key={id}
                        style={{ margin: 8, justifyContent: 'center',alignItems: 'center'}}>
                        <View>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.navigate('AustriaCityDetails', { city, name, description, location, admission, tips ,photo})}
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
                <Text style={{ fontWeight: 'bold' }}>{`<==`}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );40
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
        color: '#000',
        fontWeight: 'bold'
  
    },
})