import React  from "react";
import {TouchableOpacity,TextInput, StyleSheet,View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';


const MyProfile = () => {
  return (
    <SafeAreaView style={styles.conteiner}>
      <ScrollView>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

          <View>
            <View style={styles.usernameBlock}>
              <Text style={{ marginLeft: 5, marginBottom: 10, fontWeight: 'bold', fontSize: 25, }}>Tipe name :</Text>
              <TextInput
                //value={writingUsername}
                //onChangeText={setWritingUsername}
                style={{ marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#000', color: '#000', borderRadius: 10, width: 200, height: 40 }}
              />
              <TouchableOpacity
                style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10, width: 150, height: 40, justifyContent: 'center', alignItems: 'center' }}
              //onPress={() => setUsername(writingUsername)}
              >
                <View>
                  <Text style={{ fontSize: 25, color: '#000' }}>Save name</Text>
                </View>
                                            
              </TouchableOpacity></View>
          </View>

          <View style={styles.photoBlock}>

            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10, width: 150, height: 40, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text>ADD PHOTO</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.attractionsBlock}>
            <View>
             
              <TextInput
                placeholder="Attraction..."
                //value={writingUsername}
                //onChangeText={setWritingUsername}
                style={{ marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#000', color: '#000', borderRadius: 10, width: 200, height: 40 }}
              />
            </View>

            <View>
             
              <TextInput
                placeholder="Attraction address..."
                //value={writingUsername}
                //onChangeText={setWritingUsername}
                style={{ marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: '#000', color: '#000', borderRadius: 10, width: 200, height: 40 }}
              />
            </View>

            <View>
             
              <TextInput
                placeholder="notes about..."
                //value={bankNotes}
                //onChangeText={setBankNotes}
                multiline={true}
                style={{ marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, borderColor: '#000', color: '#000', width: 200, height: 40 }}
              />
            </View>

            <Text>Caledar</Text>

            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10, width: 150, height: 40, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text>Add ifo about my trip</Text>
            </TouchableOpacity>

          </View>

          <View style={{...styles.tripList, marginTop: 20}}>
              <Text>tripList</Text>
          </View>

        </KeyboardAvoidingView>

      </ScrollView>
      
    </SafeAreaView>
  );
};


export default MyProfile;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

})