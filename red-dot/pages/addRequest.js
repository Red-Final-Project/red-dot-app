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
import { SIZE, SPACE, styles } from './styles';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';

import DateImage from '../assets/images/calendar.png';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let dbAuth = firebase.firestore();
export default function AddRequest({ navigation }) {
  const [bloodType, setBloodType] = useState('');
  const [bloodTypeValid, setBloodTypeValid] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [quantityValid, setQuantityValid] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateValid, setDateValid] = useState(true);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState({});
  const [userData, setUserData] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('USER');
      setUserEmail(JSON.parse(jsonValue));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfil = () => {
    dbAuth
      .collection('users')
      .where('email', '==', userEmail.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserData({ id: doc.id, ...doc.data() });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(userData)
  useEffect(() => {
    getData();
  }, []);
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
    if (!bloodType) {
      setBloodTypeValid(false);
      validate = true;
    }
    if (date < new Date()) {
      setDateValid(false);
      validate = true;
    }
    if (!quantity) {
      setQuantityValid(false);
      validate = true;
    }
    if (!validate) {
      dbAuth
        .collection('posts')
        .add({
          bloodType: bloodType,
          quantity: quantity,
          deadline: date.toLocaleDateString(),
          description: description,
          user: {
            id: userData.id,
            avatar: userData.profile_picture.uri,
            name: userData.name,
          },
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
      navigation.navigate('Tabs');
    }
  };
  if (userEmail.email && !userData.email) {
    fetchProfil();
  }
  if (!userData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* <View style={styles.titlesCont}>
                <Text style={styles.titles}>Add Request</Text>
            </View> */}
      <View style={styles.containerContent}>
        <Text style={styles.textMuted}>Select Blood Type:</Text>
        <Text style={styles.registerAlert}>
          {!bloodTypeValid ? 'Blood Type Required!' : ''}
        </Text>
        <Picker
          style={styles.textInput}
          label='-- Choose Type --'
          selectedValue={bloodType}
          onValueChange={(val) => setBloodType(val)}
        >
          <Picker.Item label='-- Choose Type --' value='' />
          <Picker.Item label='A' value='A' />
          <Picker.Item label='B' value='B' />
          <Picker.Item label='AB' value='AB' />
          <Picker.Item label='O' value='O' />
        </Picker>

        <Text style={styles.textMuted}>Quantity:</Text>
        <Text style={styles.registerAlert}>
          {!quantityValid ? 'Quantity Required!' : ''}
        </Text>
        <TextInput
          style={styles.textInput}
          keyboardType={'number-pad'}
          onChangeText={setQuantity}
        />

        <Text style={styles.textMuted}>Deadline:</Text>
        <Text style={styles.registerAlert}>
          {!dateValid ? 'Invalid Date!' : ''}
        </Text>
        <View style={styles.textInput}>
          <Text style={styles.dateTxt}>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </Text>
          <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
            <Image source={DateImage} style={styles.dateImg} />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            display='default'
            onChange={onChange}
          />
        )}
        <Text style={styles.textMuted}>Description:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          style={styles.textInput}
          placeholder='Add Description Here'
        />
        <TouchableOpacity
          style={{ ...styles.buttonPrimary, marginTop: SPACE(2) }}
          onPress={requestHandler}
        >
          <Text style={styles.textWhite}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
}
