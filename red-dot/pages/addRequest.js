import React, {useState, useEffect} from 'react'
import {View, Text, Picker, TouchableOpacity, Image, TextInput} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles'
import 'firebase/firestore';
import * as firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig'

import Tabs from '../Tabs/Home'
import DateImage from '../assets/images/calendar.png'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
  
let dbAuth = firebase.firestore()
export default function AddRequest({navigation}) {
    const [bloodType, setBloodType] = useState('')
    const [bloodTypeValid, setBloodTypeValid] = useState(true)
    const [quantity, setQuantity] = useState('')
    const [quantityValid, setQuantityValid] = useState(true)
    const [date, setDate] = useState(new Date())
    const [dateValid, setDateValid] = useState(true)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')

    const [userData, setUserData] = useState({})
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('USER')
          if(jsonValue) {
              setUserData(JSON.parse(jsonValue))
          }
        } catch(err) {
          console.log(err)
        }
      }
    useEffect(() => {
        getData()
    }, [])
    console.log(userData)
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

    const requestHandler = () =>{
        let validate = false
        if(!bloodType) {
            setBloodTypeValid(false)
            validate = true
        }
        if(date < new Date()) {
            setDateValid(false)
            validate = true
        }
        if(!quantity) {
            setQuantityValid(false)
            validate = true
        }
        if(!validate) {
            dbAuth
                .collection('posts')
                .add({
                    bloodType: bloodType,
                    quantity: quantity,
                    deadline: date.toLocaleDateString(),
                    description: description,
                    user: {
                        _id: userData.id,
                        avatar: userData.profile_picture.uri,
                        name: userData.name
                    }
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            navigation.navigate('Tabs')
        } 
    }
    if(!userData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.titlesCont}>
                <Text style={styles.titles}>Add Request</Text>
            </View>
            <View style={styles.containerContent}>
                <Text style={styles.registerLabel}>
                    Select Blood Type:
                </Text>
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
                <Text style={styles.registerLabel}>Quantity:</Text>
                <Text style={styles.registerAlert}>
                        {!quantityValid ? 'Quantity Required!':''}
                </Text>
                <TextInput 
                    style={styles.registerInput} 
                    keyboardType={"number-pad"}
                    onChangeText={setQuantity} 
                />
                <Text style={styles.registerLabel}>Deadline:</Text>
                    <Text style={styles.registerAlert}>
                        {!dateValid ? 'Invalid Date!':''}
                    </Text>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateTxt}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
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
                <Text style={styles.registerLabel}>
                    Description:
                </Text>
                <TextInput 
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setDescription}
                    style={styles.textarea}
                    placeholder="Add Description Here"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerSubmit} onPress={requestHandler}>
                    <Text style={styles.registerButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}