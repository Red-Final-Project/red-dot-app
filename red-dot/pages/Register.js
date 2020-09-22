import React, {useState} from 'react'
import {View, Text, TextInput, Picker, Platform, TouchableOpacity, Image, ScrollView} from 'react-native'
import PasswordInput from 'react-native-toggle-password-visibility-expo'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker';
import {styles} from './styles'

import DateImage from '../assets/images/calendar.png'

import * as firebase from 'firebase';
import 'firebase/firestore';

import {firebaseConfig} from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  }

const db = firebase.firestore()

export default function Register({navigation}) {
    const [fullName, setFullName] = useState('')
    const [nameValid, setNameValid] = useState(true)
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(true)
    const [password, setPassword] = useState('')
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [passwordValid, setPasswordValid] = useState(true)
    const [bloodType, setBloodType] = useState('')
    const [bloodTypeValid, setBloodTypeValid] = useState(true)
    const [date, setDate] = useState(new Date())
    const [dateValid, setDateValid] = useState(true)
    const [profile_picture, setProfile_picture] = useState({})
    const [imageValid, setImageValid] = useState(true)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});
        uploadAsFile(pickerResult.uri, (resolve, reject) => {
            if(error) return error
            console.log(resolve)
        })
      }
      const uploadAsFile = async (uri, progressCallback) => {

        console.log("uploadAsFile", uri)
        const response = await fetch(uri);
        const blob = await response.blob();
      
        let metadata = {
          contentType: 'image/jpeg',
        };
      
        let name = new Date().getTime() + "-media.jpg"
        const ref = firebase
          .storage()
          .ref()
          .child('profile_pictures/' + name)
      
        const task = ref.put(blob, metadata);
      
        return new Promise((resolve, reject) => {
          task.on(
            'state_changed',
            (snapshot) => {
              progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)
      
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => reject(error),
            () => {
                ref.getDownloadURL()
                .then(uri => {
                    setProfile_picture({uri: uri})
                })
                .catch(err => {
                    console.log(err)
                })
            }
          );
        });
      }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showDatePicker = () => {
        showMode('date')
    }

    const registerHandler = () => {
        let validation = false
        if(!fullName) {
            setNameValid(false)
            validation = true
        }
        if(!email) {
            setEmailValid(false)
            validation = true
        }
        if(!password) {
            setPasswordEmpty(true)
            validation = true
        }
        if(password.length < 8 && password.length !== 0) {
            setPasswordValid(false)
            validation = true
        }
        if(!bloodType) {
            setBloodTypeValid(false)
            validation = true
        }
        if(date > new Date()) {
            setDateValid(false)
            validation = true
        }
        if(!profile_picture) {
            setImageValid(false)
            validation = true
        }
        if(!validation) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                db
                  .collection("users")
                  .doc(Math.random().toString(36).substring(7))
                  .set({
                    email: email,
                    name: fullName,
                    password:password,
                    bloodType: bloodType,
                    last_donation_date: date.toLocaleDateString(),
                    profile_picture: {uri: profile_picture.uri},
                    createdAt: Date.now()
                  })
                  .then(function() {
                    console.log("Document successfully written!")
                    navigation.navigate('Login')
                  })
                  .catch(function(error) {
                    console.error("Error writing document: ", error);
                  })
              })
              .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
        }


    }
    return(
        <View>
            <ScrollView>
                <View style={styles.containerContent}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.registerLabel}>*Full Name:</Text>
                    <Text style={styles.registerAlert}>
                        {!nameValid ? 'Full Name Required!':''}
                    </Text>
                    <TextInput style={styles.registerInput} onChangeText={setFullName} placeholder="Your Name"/>
                    <Text style={styles.registerLabel}>*Email:</Text>
                    <Text style={styles.registerAlert}>
                        {!emailValid ? 'Email Required!':''}
                    </Text>
                    <TextInput 
                        style={styles.registerInput}
                        onChangeText={setEmail} 
                        placeholder="e.g: john@mail.com"
                    />
                    <Text style={styles.registerLabel}>*Password:</Text>
                    <Text style={styles.registerAlert}>
                        {passwordEmpty ? 'Password Required!': !passwordValid ? 'Invalid Password Length!' : ''}
                    </Text>
                    <PasswordInput 
                        style={styles.registerInput}
                        onChangeText={setPassword} 
                        placeholder="input: 8-32 character"
                    />
                    <Text style={styles.registerLabel}>*Blood Type:</Text>
                    <Text style={styles.registerAlert}>
                        {!bloodTypeValid ? 'Blood Type Required!':''}
                    </Text>
                    <Picker 
                        style={styles.registerInput}
                        label="-- Choose Type --"
                        selectedValue={bloodType}
                        onValueChange={(val) => setBloodType(val)}
                    >
                        <Picker.Item label="-- Choose Type --" value='' />
                        <Picker.Item label="A" value="A"/>
                        <Picker.Item label="B" value="B"/>
                        <Picker.Item label="AB" value="AB"/>
                        <Picker.Item label="O" value="O"/>
                    </Picker>
                    <Text style={styles.registerLabel}>*Last Donor Date:</Text>
                    <Text style={styles.registerAlert}>
                        {!dateValid ? 'Invalid Date!':''}
                    </Text>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateTxt}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
                        <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
                           <Image source={DateImage} style={styles.dateImg} />
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                <Text style={styles.registerLabel}>Profile Picture:</Text>
                <Text style={styles.registerAlert}>
                        {!imageValid ? 'Photo Required!':''}
                    </Text>
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonAddImg}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
                <Text style={styles.registerAlert}>* Required Fields</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.registerSubmit} onPress={registerHandler}>
                        <Text style={styles.registerButtonTitle}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}