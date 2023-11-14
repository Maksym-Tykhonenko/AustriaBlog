import React ,{useState, useEffect} from "react";
import { StyleSheet,View, Text,TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';

//import { austria } from "../data/austria";



const AustriaCityDitails = ({ navigation, route }) => {
    const [phottto, setPhoto] = useState([]);
    console.log('photo==>',phottto)
    const { city , name, description, location, admission, tips,  } = route.params;
    
    {/**  */ }useEffect(() => {
        getImgs()
    }, []);

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '29676821-2dfd501c3768e552959bc01fb';
    // searchOption = 'image_type=photo&orientation=horizontal'; &image_type=photo
    const PER_PAGE = 3;

    const getImgs = () => {
        fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&per_page=${PER_PAGE}`)
            .then((res) => {
               return res.json()
            }).then(data => {
                console.log('data==>', data)
                setPhoto(data.hits)
            }).catch(e => {
                console.error(`Error: ${e}`);
            })
        
    };



    return (
        <SafeAreaView style={styles.conteiner}>
            <ScrollView style={{ paddingTop: 20 }}>
                <View style={styles.scrollView}>
                    {phottto.map((item) => {
                        const index = phottto.indexOf(item)
                        return (
                    
                            <Image
                                style={{
                                    width: index === 0 ? '100%' : 160,
                                    height: index === 0 ? 250 : 100,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                    resizeMode: 'cover'
                            
                                }}
                                source={{ uri: item.webformatURL }} />
                
                        )
                    })}
                </View>
                {/** <Image
                    style={{width: '100%', height: 200}} webformatURL
                /> */}
                <View><Text>City: <Text>{city}</Text></Text></View>
                <View><Text>Name: <Text>{name}</Text></Text></View>
                <View><Text>Location: <Text>{location}</Text></Text></View>
                <View><Text>Description: <Text>{description}</Text></Text></View>
                <View><Text>Admission: <Text>{admission}</Text></Text></View>
                <View style={{marginBottom: 50}}><Text>Tips: <Text>{tips}</Text></Text></View>
              
            </ScrollView>

            {/**BtnBack */}
            <TouchableOpacity
                onPress={() => navigation.navigate('AustriaDetails')}
                style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{`<==`}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


export default AustriaCityDitails;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
        marginHorizontal: 20,
    position: 'relative'
  },
scrollView: {
        flexDirection: 'row',
    flexWrap: 'wrap',
        justifyContent: 'space-between',
      }
        
})