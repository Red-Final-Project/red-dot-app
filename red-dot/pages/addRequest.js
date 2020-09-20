import React, {useState} from 'react'
import {View, Text, Picker, TouchableOpacity, Image} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {styles} from './styles'

import DateImage from '../assets/images/calendar.png'
import { TextInput } from 'react-native-gesture-handler'

export default function Tabs({navigation}) {
    const [bloodType, setBloodType] = useState('')
    const [bloodTypeValid, setBloodTypeValid] = useState(true)
    const [date, setDate] = useState(new Date())
    const [dateValid, setDateValid] = useState(true)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')

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
        if(!validate) {
            navigation.navigate('Tabs')
        } 
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