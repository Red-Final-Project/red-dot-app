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
import * as ImagePicker from 'expo-image-picker';
import { color } from 'react-native-reanimated';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const eventsRef = db.collection('events');

export default function AddRequest({ navigation, route }) {
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
  const [eventDate, setEventDate] = useState(new Date());
  const [isEventDate, setIsEventDate] = useState(true);
  const [progress, setProgress] = useState(0);

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
    if (route.params) {
      setLatlang(route.params.latLang);
    }
  }, [route]);


  //   console.log(userData);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShow(Platform.OS === 'ios');
    setEventDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const openImagePickerAsync = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
      });
      uploadAsFile(pickerResult.uri, (resolve, reject) => {
        if (reject) return console.log(reject);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAsFile = async (uri, progressCallback) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      let metadata = {
        contentType: 'image/jpeg',
      };

      let name = new Date().getTime() + '-media.jpg';
      const ref = firebase
        .storage()
        .ref()
        .child('events/' + name);

      const task = ref.put(blob, metadata);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
            progressCallback &&
              progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);

            const _progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(_progress);
          },
          (error) => reject(error),
          () => {
            ref.getDownloadURL().then((uri) => {
              setImgUrl(uri);
            });
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const requestHandler = () => {
    let validate = false;

    if (!title) {
      setIsTitle(false);
      validate = true;
    }

    if (eventDate < new Date()) {
      setIsEventDate(false);
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

    if (!img_url) {
      setIsImgUrl(false);
      validate = true;
    }

    if (!latLang) {
      setIsLatLang(false);
      validate = true;
    }

    if (!validate) {
      (async () => {
        try {
          const result = await eventsRef.add({
            title,

            eventDate: new Date(eventDate),
            location: new firebase.firestore.GeoPoint(
              latLang.latitude,
              latLang.longitude
            ),
            address,
            img_url,
            description,
            createdDate: new Date(),
          });
        } catch (error) {
          console.log(error);
        }
      })();
      navigation.goBack();
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
          {!title && !isTitle ? 'Title is required!' : ''}
        </Text>

        <Text style={styles.registerLabel}>Event Date:</Text>
        <View style={styles.dateInput}>
          <Text style={styles.dateTxt}>
            {eventDate.getDate()}/{eventDate.getMonth()}/
            {eventDate.getFullYear()}
          </Text>
          <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
            <Image source={DateImage} style={styles.dateImg} />
          </TouchableOpacity>
        </View>
        <Text style={styles.registerAlert}>
          {!isEventDate ? 'Date is invalid!' : ''}
        </Text>

        <Text style={styles.registerLabel}>Address:</Text>
        <TextInput style={styles.registerInput} onChangeText={setAddress} />
        <Text style={styles.registerAlert}>
          {!address && !isAddress ? 'Location is required!' : ''}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
          <Text style={styles.registerAlert}>
            {!isLatLang ? (
              'Map location is required!'
            ) : (
              <Text style={{ color: 'green' }}>
                {latLang ? 'Map location is set' : ''}
              </Text>
            )}
          </Text>
        </View>

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={eventDate}
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
          {!description && !isDescription ? 'Description is required!' : ''}
        </Text>
        <Text style={styles.registerLabel}>Event Picture:</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'darkred',
              padding: 5,
            }}
            onPress={openImagePickerAsync}
          >
            <Text style={{ color: 'darkred' }}>Set event picture</Text>
          </TouchableOpacity>
          <Text style={styles.registerAlert}>
            {!isImgUrl ? (
              <Text>'Event picture is required!'</Text>
            ) : progress > 0 && progress < 100 ? (
              <Text style={{ color: 'black' }}>{`Uploading ${progress.toFixed(
                0
              )}%`}</Text>
            ) : (
              <Text style={{ color: 'green' }}>
                {img_url ? 'Event picture is set' : ''}
              </Text>
            )}
          </Text>
        </View>
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
