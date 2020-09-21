import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles'
import {clearStorage} from '../AsyncStore'



export default function Profile({navigation}) {
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
    const logoutHandler = async () => {
        await clearStorage()
        navigation.navigate('Login')
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
                <Text style={styles.titles}>Profile</Text>
                <TouchableOpacity onPress={logoutHandler}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileDescription}>
                <Image source={{uri: userData.profile_picture.uri}} style={styles.profil_photo} />
                <Text>Name: {userData.name}</Text>
                <Text>Email: {userData.email}</Text>
            </View>
        </View>
    )
}