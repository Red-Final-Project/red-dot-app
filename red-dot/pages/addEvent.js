import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';

import Tabs from '../Tabs/Home';
import DateImage from '../assets/images/calendar.png';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const eventsRef = db.collection('events');

export default function AddRequest({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [dateValid, setDateValid] = useState(true);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState(null);
  const [isTitle, setIsTitle] = useState(true);
  const [address, setAddress] = useState(null);
  const [isAddress, setIsAddress] = useState(true);
  const [latLang, setLatlang] = useState(null);
  const [isLatLang, setIsLatLang] = useState(true);
  const [img_url, setImgUrl] = useState(null);
  const [isImgUrl, setIsImgUrl] = useState(true);
  const [description, setDescription] = useState(null);
  const [isDescription, setIsDescription] = useState(true);
  const [eventDate, setEventDate] = useState(null);
  const [isEventDate, setIsEventDate] = useState(true);
  const [createdDate, setCreatedDate] = useState(null);
  const [isCreatedDate, setIsCreatedDate] = useState(true);

  const [userData, setUserData] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('USER');
      if (jsonValue) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // getData();
    setLatlang(route.params.latLang);
  }, []);

  console.log(userData);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const requestHandler = () => {
    let validate = false;

    if (!title) {
      setIsTitle(false);
      validate = true;
    }

    if (date < new Date()) {
      setDateValid(false);
      validate = true;
    }

    if (!description) {
      setIsDescription(false);
      validate = true;
    }

    if (!address) {
      setIsAddress(false);
      validate = true;
    }

    if (!latLang) {
      setIsLatLang(false);
      validate = true;
    }

    if (!validate) {
      //   dbAuth
      //     .collection('events')
      //     .add({
      //       bloodType: bloodType,
      //       quantity: quantity,
      //       deadline: date.toLocaleDateString(),
      //       description: description,
      //       user: {
      //         _id: userData.id,
      //         avatar: userData.profile_picture.uri,
      //         name: userData.name,
      //       },
      //     })
      //     .then(function (docRef) {
      //       console.log('Document written with ID: ', docRef.id);
      //     })
      //     .catch(function (error) {
      //       console.error('Error adding document: ', error);
      //     });
      (async () => {
        try {
          const result = await eventsRef.add({
            title,
            img_url: 'https://picsum.photos/300',
            eventDate: new Date(date),
            location: new firebase.firestore.GeoPoint(
              latLang.latitude,
              latLang.longitude
            ),
            description,
            createdDate: new Date(),
          });
          navigation.goBack();
        } catch (error) {
          console.log(err);
        }
      })();
      // navigation.navigate('Tabs');
    }
  };

  if (!userData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titlesCont}>
        <Text style={styles.titles}>Add Event</Text>
      </View>
      <View style={styles.containerContent}>
        <Text style={styles.registerLabel}>Title:</Text>
        <TextInput style={styles.registerInput} onChangeText={setTitle} />
        <Text style={styles.registerAlert}>
          {!title && !isTitle ? 'Title is Required!' : ''}
        </Text>

        <Text style={styles.registerLabel}>Event Date:</Text>
        <View style={styles.dateInput}>
          <Text style={styles.dateTxt}>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </Text>
          <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
            <Image source={DateImage} style={styles.dateImg} />
          </TouchableOpacity>
        </View>
        <Text style={styles.registerAlert}>
          {!dateValid ? 'Invalid Date!' : ''}
        </Text>

        <Text style={styles.registerLabel}>Address:</Text>
        <TextInput style={styles.registerInput} onChangeText={setAddress} />
        <Text style={styles.registerAlert}>
          {!address && !isAddress ? 'Location is Required!' : ''}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'darkred',
              padding: 5,
            }}
            onPress={() => {
              if (!address) {
                setIsAddress(false);
              } else {
                navigation.navigate('SetEventLocation', { address });
              }
            }}
          >
            <Text style={{ color: 'darkred' }}>Set map location</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.registerAlert}>
          {!latLang && !isLatLang ? 'Map location is Required!' : ''}
        </Text>

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            display='default'
            onChange={onChange}
          />
        )}
        <Text style={styles.registerLabel}>Description:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          style={styles.textarea}
          placeholder='Add Description Here'
        />
        <Text style={styles.registerAlert}>
          {!description && !isDescription ? 'Description is Required!' : ''}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerSubmit}
          onPress={requestHandler}
        >
          <Text style={styles.registerButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
