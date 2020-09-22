import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, AnimatedRegion } from 'react-native-maps';
import { styles } from './styles';
import { Button } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Tabs({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { address } = route.params;
  const [search, setSearch] = useState('');
  const [isSset, setIsSet] = useState(false);

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
      const geometry = respJson.results[0].geometry.location;
      setLatitude(geometry.lat);
      setLongitude(geometry.lng);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostion(address);
    // setLatitude(5.5951956);
    // setLongitude(100.6722227);
    setTimeout(() => {
      setIsSet(true);
    }, 5000);
  }, []);

  const handleSearch = () => {
    getPostion(search);
    // setLatitude(3.5951956);
    // setLongitude(98.6722227);
    setSearch('');
  };

  const handleClick = () => {
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
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            draggable
            coordinate={{ latitude, longitude }}
            onDragStart={() => setIsSet(false)}
            onDragEnd={(e) => {
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
            value={search}
            onChangeText={setSearch}
          ></TextInput>
          <Button
            icon={<Icon name='search' size={15} color='white' />}
            type='clear'
            style={{ width: '20%', alignItems: 'center' }}
            onPress={handleSearch}
          ></Button>
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
