import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'
import { dbAuth } from './LoginPage'
import {styles} from './styles'

import Icon from '../assets/images/settings.png'
export default function Profile({navigation}) {
    const [userData, setUserData] = useState({})
    const [userEmail, setUserEmail] = useState({})
    
    const fetchProfil = () => {
        dbAuth
        .collection("users")
        .where("email", "==", userEmail.email)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setUserData({id: doc.id, ...doc.data()})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('USER')
          setUserEmail(JSON.parse(jsonValue))
        } catch(err) {
          console.log(err)
        }
      }

    useEffect(() => {
        getData()
    }, [])

    // console.log(userEmail.email)
    if(userEmail.email && !userData.email) {
        fetchProfil()
    }
    if(!userData.email) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
        return (
            <View style={styles.profileDescription}>
                <View style={styles.editBtnContainer}>
                    <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile', {user: userData})}>
                        <Text style={styles.editBtnTxt}>Edit Profile</Text>
                        <Image style={styles.settingIcon} source={Icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profilBot}>
                    <Image source={{uri: userData.profile_picture.uri}} style={styles.profil_photo} />
                </View>
                <View>
                    <Text style={styles.profil_name}>{userData.name}</Text>
                    <Text style={styles.profil_text}>Email: {userData.email}</Text>
                    <Text style={styles.profil_text}>Blood Type: {userData.bloodType}</Text>
                    <Text style={styles.profil_text}>Last Donor Date: {userData.last_donation_date}</Text>
                </View>
            </View>
        )
}