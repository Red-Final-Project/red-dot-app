import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { styles } from '../pages/styles';

import Map from '../assets/images/map.png';
export default function Tabs({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locations, setLocations] = useState(null);
  const [desLatitude, setDesLatitude] = useState(null);
  const [desLongitude, setDesLongitude] = useState(null);
  const [path, setPath] = useState([]);
  const [pathDesc, setPathDesc] = useState({});
  // const [event, setEvent] = useState(null);
  // const [events, setEvents] = useState(null);

  // setEvent(route.params.event)
  // setEvents(route.params.events)
  // console.log(event, '<<<',events);
  const { event, events } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location is required');
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    setLocations(locs(latitude, longitude));
  }, [latitude, longitude]);

  useEffect(() => {
    // getDirections();
  }, [desLatitude, desLongitude]);

  const getDirections = async () => {
    try {
      // const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyBG5kSOht3eeVQXC2Lkx4fIH8wqQolahr8`)
      // const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyBG5kSOht3eeVQXC2Lkx4fIH8wqQolahr8`)
      const startLoc = `${latitude},${longitude}`;
      const desLoc = `${desLatitude},${desLongitude}`;
      const resp = await fetch(
        `https://trueway-directions2.p.rapidapi.com/FindDrivingPath?origin=${startLoc}&destination=${desLoc}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'trueway-directions2.p.rapidapi.com',
            'x-rapidapi-key':
              'aa651ca0e1msh85058b0376ee4edp152024jsn136b13e5c02f',
          },
        }
      );
      const respJson = await resp.json();
      const resPath = respJson.route.geometry.coordinates;
      const newPath = resPath.map((e) => ({ latitude: e[0], longitude: e[1] }));
      setPath(newPath);
      setPathDesc({
        distance: respJson.route.distance,
        duration: respJson.route.duration,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onMarkerPress = (loc) => {
    const {
      coords: { latitude: la, longitude: lo },
    } = loc;
    setDesLatitude(la);
    setDesLongitude(lo);
  };
  if (latitude == null || longitude == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={{}}>
        <MapView
          style={{
            width: '100%',
            height: '100%',
          }}
          showsCompass
          showsMyLocationButton={true}
          showsUserLocation
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: event.location.latitude + latitude,
              longitude: event.location.longitude + longitude,
            }}
            title={event.title}
            // onPress={() =>
            //   onMarkerPress({
            //     latitude: latitude + 0.03,
            //     longitude: longitude + 0.03,
            //   })
            // }
            description={`Distance: ${pathDesc.distance} meters, Duration:${(
              pathDesc.duration / 60
            ).toFixed(2)} minutes`}
          ></Marker>

          {desLatitude && desLongitude && desLatitude && desLongitude && (
            <Polyline
              coordinates={path}
              strokeWidth={5}
              strokeColor='teal'
              lineCap='round'
            />
          )}
        </MapView>
      </View>
    );
  }
}

const locs = (lat, lon) => [
  {
    name: 'A',
    coords: {
      latitude: lat + Math.random() * 0.03,
      longitude: lon + Math.random() * 0.03,
    },
  },
  {
    name: 'B',
    coords: {
      latitude: lat + Math.random() * 0.03,
      longitude: lon + Math.random() * 0.03,
    },
  },
  {
    name: 'C',
    coords: {
      latitude: lat + Math.random() * 0.03,
      longitude: lon + Math.random() * 0.03,
    },
  },
  {
    name: 'D',
    coords: {
      latitude: lat + Math.random() * 0.03,
      longitude: lon + Math.random() * 0.03,
    },
  },
  {
    name: 'E',
    coords: {
      latitude: lat + Math.random() * 0.03,
      longitude: lon + Math.random() * 0.03,
    },
  },
];
