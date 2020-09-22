import React, {useState, useEffect} from 'react'
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
export default function EditProfile({route, navigation}) {
    const {user} = route.params
    const [fullName, setFullName] = useState(null)
    const [nameValid, setNameValid] = useState(true)
    const [email, setEmail] = useState(null)
    const [emailValid, setEmailValid] = useState(true)
    const [password, setPassword] = useState(null)
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [passwordValid, setPasswordValid] = useState(true)
    const [bloodType, setBloodType] = useState(null)
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
        if(!bloodType) {
            setBloodTypeValid(false)
            validation = true
        }
        if(new Date(date) > new Date()) {
            setDateValid(false)
            validation = true
        }
        if(!validation) {
            db
              .collection("users")
              .doc(user.id)
              .update({
                email: (email ? email : user.email),
                name: (fullName ? fullName : user.name),
                bloodType: (bloodType ? bloodType: user.bloodType),
                last_donation_date: (date ? date.toLocaleDateString() : user.last_donation_date),
                profile_picture: {
                    uri: (profile_picture.uri ? profile_picture.uri : user.profile_picture.uri)
                }
              })
              .then(function() {
                console.log("Document successfully updated!")
                navigation.navigate('Profile')
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              })
        }
    }

    if(!user.email) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
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
                    <TextInput 
                        style={styles.registerInput} 
                        onChangeText = {setFullName} 
                        placeholder="Your Full Name"
                        value={fullName === null ? user.name : fullName}
                    />
                    <Text style={styles.registerLabel}>*Email:</Text>
                    <Text style={styles.registerAlert}>
                        {!emailValid ? 'Email Required!':''}
                    </Text>
                    <TextInput 
                        style={styles.registerInput}
                        onChangeText={setEmail} 
                        placeholder="Your Email"
                        value={email === null ? user.email : email}
                    />
                    {user.password &&
                        <> 
                        <Text style={styles.registerLabel}>*Password:</Text>
                        <Text style={styles.registerAlert}>
                            {passwordEmpty ? 'Password Required!': !passwordValid ? 'Invalid Password Length!' : ''}
                        </Text>
                        <PasswordInput 
                            style={styles.registerInput}
                            onChangeText={setPassword} 
                            placeholder="Your Password"
                            value={password === null ? user.password : password}
                        />
                        </>
                    } 
                    <Text style={styles.registerLabel}>*Blood Type:</Text>
                    <Text style={styles.registerAlert}>
                        {!bloodTypeValid ? 'Blood Type Required!':''}
                    </Text>
                    <Picker 
                        style={styles.registerInput}
                        label="-- Choose Type --"
                        selectedValue={bloodType === null ? user.bloodType : bloodType }
                        onValueChange={(val) => setBloodType(val)}
                    >
                        <Picker.Item label="-- Choose Type --" value={null} />
                        <Picker.Item label="A" value="A"/>
                        <Picker.Item label="B" value="B"/>
                        <Picker.Item label="AB" value="AB"/>
                        <Picker.Item label="O" value="O"/>
                    </Picker>
                    <Text style={styles.registerLabel}>*Last Donor Date:</Text>
                    <Text style={styles.registerAlert}>
                        {!dateValid && 'Invalid Date!'}
                    </Text>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateTxt}>{new Date(date).getDate()}/{new Date(date).getMonth()+1}/{new Date(date).getFullYear()}</Text>
                        <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
                           <Image source={DateImage} style={styles.dateImg} />
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={user.last_donation_date === "_" ? new Date(date) : user.last_donation_date}
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
                        <Text style={styles.registerButtonTitle}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}