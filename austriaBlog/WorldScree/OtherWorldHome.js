import React from "react"; 
import { StyleSheet,TouchableOpacity, SafeAreaView, Text, View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const OtherWorldHome = () => {
    return (
        <SafeAreaView style={{flex:1, position: 'relative'}}>
            <ImageBackground
                style={{flex:1}}
                source={require('../accets/backgr.png')}
            >
                 <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
                    <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold', }}>Other World :</Text>
                </View>

                <ScrollView>

                </ScrollView>


                {/**btnModalOpen */}
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={{position: 'absolute',
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
        borderColor: '#ccc',}}>
                    <Text style={{fontSize: 25,
        color: '#ccc',
        fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>

            </ImageBackground>

        </SafeAreaView>
    )
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