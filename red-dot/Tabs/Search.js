import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, Picker, TouchableOpacity, SafeAreaView} from 'react-native' 

import {dbAuth} from '../pages/LoginPage'
import {styles} from '../pages/styles'

import SeachCard from '../components/seacrhBy'
export default function Tabs({navigation}) {
    const [searchValue, setSearchValue] = useState(null)
    const [bloodType, setBloodType] = useState('')
    const searchHandler = (value) => {
        console.log(value, "valueeee?>>>>>")
        setBloodType(value)
        let result = [];
        dbAuth
        .collection('users')
        // .where("bloodType", "==", value)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                result.push(doc.data())
            })
            // console.log(result)
            let filtered = result.filter(card => card.bloodType === value)
            // if(!fileted.length) return setSearchValue(null)
            setSearchValue(filtered)
        })
        .catch(err => {
            console.log(err)
        })
    }
    // useEffect(() => {
    //     searchHandler()
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         searchHandler()
    //     })
    //     return unsubscribe 
    // }, [searchValue])
    if(!searchValue) {
       return (
        <>
        <View style={styles.titlesCont}>
            <Text style={styles.titles}>Search Donor</Text>
        </View>
        <View style={styles.searchForm}>
            <Text>Select Blood Type:</Text>
            <Picker 
                style={styles.registerInput}
                label="-- Choose Type --"
                selectedValue={bloodType}
                onValueChange={(val) => searchHandler(val)}
            >
                <Picker.Item label="-- Choose Type --" value='' />
                <Picker.Item label="A" value="A"/>
                <Picker.Item label="B" value="B"/>
                <Picker.Item label="AB" value="AB"/>
                <Picker.Item label="O" value="O"/>
            </Picker>
        </View>
        </>
        )
    } else {
    return (
        <SafeAreaView>
            <View style={styles.titlesCont}>
                <Text style={styles.titles}>Search Donor</Text>
            </View>
            <View style={styles.searchForm}>
                <Text>Select Blood Type:</Text>
                <Picker 
                    style={styles.registerInput}
                    label="-- Choose Type --"
                    selectedValue={bloodType}
                    onValueChange={(val) => searchHandler(val)}
                >
                    <Picker.Item label="-- Choose Type --" value='' />
                    <Picker.Item label="A" value="A"/>
                    <Picker.Item label="B" value="B"/>
                    <Picker.Item label="AB" value="AB"/>
                    <Picker.Item label="O" value="O"/>
                </Picker>
            </View>
            <ScrollView
                onScrollBeginDrag={() => navigation.setOptions({tabBarVisible: true})} 
                onScroll={() => navigation.setOptions({tabBarVisible: false})}
                style={{marginBottom: 55}}
            >
                {searchValue && searchValue.map((card, idx) => (
                    <SeachCard key={idx} card={card} />
                ))}
            </ScrollView>
        </SafeAreaView>
        )
    }
        
}