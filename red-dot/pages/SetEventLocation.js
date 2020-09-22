import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { styles } from './styles';
import { Button } from 'react-native-elements';
import Map from '../assets/images/map.png';
import { add } from 'react-native-reanimated';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Tabs({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { address } = route.params;
  const [search, setSearch] = useState('');
  const [isSset, setIsSet] = useState(false);

  const updateSearch = (search) => {
    setSearch({ search });
  };

  const getPostion = async (address) => {
    try {
      const resp = await fetch(
        `https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${address}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com',
            'x-rapidapi-key':
              'aa651ca0e1msh85058b0376ee4edp152024jsn136b13e5c02f',
          },
        }
      );
      const respJson = await resp.json();
      console.log(respJson);
      const geometry = respJson.results[0].geometry.location;
      setLatitude(geometry.lat);
      setLongitude(geometry.lng);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostion(address);
    setTimeout(() => {
      setIsSet(true);
    }, 5000);
  }, []);

  const handleClick = () => {
    console.log('loc', { latitude, longitude });
    navigation.navigate('AddEvent', { latLang: { latitude, longitude } });
  };

  const hint = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        borderColor: 'teal',
        backgroundColor: 'rgba(1,1,1,0.5)',
        width: '100%',
        flexDirection: 'row',
        width: '80%',
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        Hold and drag the marker. Then release and set your location.
      </Text>
    </View>
  );

  if (latitude == null || longitude == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View
        style={
          (styles.container,
          {
            alignItems: 'center',
          })
        }
      >
        <MapView
          style={{
            width: '100%',
            height: '100%',
          }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={{ latitude, longitude }}
            onDragStart={() => setIsSet(false)}
            onDragEnd={(e) => {
              console.log({ latLang: e.nativeEvent.coordinate });
              setIsSet(true);
            }}
          />
        </MapView>
        <View
          style={{
            position: 'absolute',
            top: 20,
            borderColor: 'teal',
            backgroundColor: 'rgba(1,1,1,0.5)',
            width: '100%',
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-around',
            padding: 10,
            borderRadius: 20,
          }}
        >
          <TextInput
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              color: 'black',
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          ></TextInput>
          {/* <TouchableOpacity style={{alignItems:'center'}}> */}
          <Button
            icon={<Icon name='search' size={15} color='white' />}
            type='clear'
            style={{ width: '20%', alignItems: 'center' }}
          ></Button>
          {/* </TouchableOpacity> */}
        </View>

        {!isSset ? (
          hint()
        ) : (
          <View style={{ position: 'absolute', bottom: 40 }}>
            <Button
              buttonStyle={{
                paddingHorizontal: 30,
                alignItems: 'center',
                backgroundColor: 'darkred',
              }}
              title='Set location'
              titleStyle={{ fontWeight: '100' }}
              onPress={handleClick}
            ></Button>
          </View>
        )}
      </View>
    );
  }
}
