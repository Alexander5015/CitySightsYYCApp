import React, { useState, useEffect, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps'; 
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Keys from '../../apiKeys';


const HomeScreen = ({navigation}) => {
  const [region, setRegion] = useState({
        latitude: parseFloat("52.51375"),
        longitude: parseFloat("13.42462"),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,});
  const [isLoading, setIsLoading] = useState(true);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originPos, setOriginPos] = useState({});
  const [destinationPos, setDestinationPos] = useState({});
  const destinationInputRef = createRef();
  const [suggestionArray, setSuggestionArray] = useState([]);

  const [originFocused, setOriginFocused] = useState(false)

  const [destinationFocused, setDestinationFocused] = useState(false)
  const onDestinationFocus = () => setDestinationFocused(true)
  const onDestinationBlur = () => setDestinationFocused(false)



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords)
      setRegion(region => ({...region, latitude:location.coords.latitude, longitude:location.coords.longitude}))
      setIsLoading(false)
    })();
  }, []);

  useEffect(() => {
    axios.get(`https://autosuggest.search.hereapi.com/v1/autosuggest?q=${(origin.length > 0) ? origin : " "}&at=${region.latitude},${region.longitude}&limit=5&apikey=${Keys.HERE_KEY}`).then(res => {
        let tempArray = [];
        res.data.items.map(item => {tempArray.push(item)});
        if(originFocused) {
          setSuggestionArray(tempArray);
        }
        else {
          setSuggestionArray([]);
        }
      });
  }, [origin, originFocused]); 

  useEffect(() => {
    axios.get(`https://autosuggest.search.hereapi.com/v1/autosuggest?q=${(destination.length > 0) ? destination : " "}&at=${region.latitude},${region.longitude}&limit=5&apikey=${Keys.HERE_KEY}`).then(res => {
        let tempArray = [];
        res.data.items.map(item => {tempArray.push(item)});
        if(destinationFocused) {
          setSuggestionArray(tempArray);
        }
        else {
          setSuggestionArray([]);
        }
      });
  }, [destination, destinationFocused]);
  useEffect(() => {
    if(destinationPos.lat && originPos.lat) {
      navigation.navigate('RouteScreen', {originPosition: originPos, destinationPosition: destinationPos, departureTime: departureTime.toISOString()});
    }
  }, [destinationPos, originPos]);

  if(isLoading) {
    return (
      <Text>Loading...(you could also use or what ever you want to show while loading the request)</Text>
    )
  } else{
    return (
      <>
        <MapView 
          style={styles.map}
          //specify our coordinates.
          showsUserLocation={true}
          initialRegion={region}
          //provider={PROVIDER_GOOGLE}
          region={region}/>
        <View style={{height:'auto', minHeight:165, backgroundColor:'white'}}>
          <View style={{height:205, marginBottom: 5}}>
            <TextInput
              onFocus={onDestinationFocus} onBlur={onDestinationBlur}
              style={{
                top: 40,
                borderRadius: 10,
                margin: 20,
                marginTop: 0,
                marginBottom: 5,
                color: '#000',
                borderColor: '#666',
                backgroundColor: '#FFF',
                borderWidth: 1,
                height: 45,
                paddingHorizontal: 10,
                fontSize: 18,
              }}
            value={destination}
            onChangeText={(destination) =>
              setDestination(destination)
            }
            placeholder="Enter Destination"
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={destinationInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            />
        <View style={styles.activityContainer}>
          <TouchableOpacity onPress={navigation.navigate("ExploreScreen")} style={styles.activityButton}>
            <Text style={styles.activityButtonText}>{"Explore Activities"}</Text>
          </TouchableOpacity>
          <Pressable style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(199,199,204,0.7)'
                  : 'rgba(199,199,204,1)'
              },styles.activityButton]}>
            <Text style={styles.activityButtonText}>{"Share an Activity"}</Text>
          </Pressable>
        </View>
          </View>
          {suggestionArray.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.item}
                  activeOpacity={0.5}
                  onPress={() => {
                    if(originFocused) {
                      destinationInputRef.current &&
                      destinationInputRef.current.focus()
                      setOrigin(item.title)
                      setOriginPos(item.position)
                    }
                    else {
                      destinationInputRef.current &&
                      destinationInputRef.current.blur()
                      Keyboard.dismiss
                      if(destinationFocused) {
                        setDestination(item.title)
                        setDestinationPos(item.position)
                      }
                    }
                  }}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

    container: {
      padding: 50,
      flex: 1,
    },
    item: {
      //top:30,
      borderColor: '#666',
      backgroundColor: '#FFF',
      height: 45,
      paddingHorizontal: 10,
      alignItems: 'center',
      borderWidth: 0.5,

    },
    itemText: {
      color: '#000',
      paddingVertical: 12,
      fontSize: 16,
    },
    activityContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      position: 'relative',
      top: 50
    },
    activityButton: {
      borderWidth: 0,
      borderColor: '#7DE24E',
      height: 60,
      width: 80,
      margin: 10,
      marginHorizontal: 20,
      flex: 1,
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 0,
      backgroundColor: 'rgb(199,199,204)',
      activeOpacity: 0.7,
      textAlign: 'center',
    },
    activityButtonText: {
      fontWeight: '500',
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
    },
  
});


   export default HomeScreen;