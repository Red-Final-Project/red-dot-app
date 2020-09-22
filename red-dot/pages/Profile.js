import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'
import { dbAuth } from './LoginPage'
import {styles} from './styles'

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
        //   return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(err) {
          console.log(err)
        }
      }
    
     const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }

    useEffect(() => {
        getData()
    }, [])

    const logoutHandler = () => {
        firebase.auth().signOut().then(function() {
            clearAll()
            navigation.navigate('Login')
        }).catch(function(error) {
            console.log(error)
        });
    }
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
            <View>
                <View style={styles.titlesCont}>
                    <Text style={styles.titles}>Profile</Text>
                    <TouchableOpacity onPress={logoutHandler} style={styles.logoutBtn}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDescription}>
                    <Image source={{uri: userData.profile_picture.uri}} style={styles.profil_photo} />
                    <Text>Name: {userData.name}</Text>
                    <Text>Email: {userData.email}</Text>
                    <Text>Blood Type: {userData.bloodType}</Text>
                    <Text>Last Donor Date: {userData.last_donation_date}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {user: userData})}>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
}