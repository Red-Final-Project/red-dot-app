import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, ScrollView, Image, YellowBox, Button} from 'react-native' 
import { styles } from './styles'
import AsyncStorage from '@react-native-community/async-storage'

import Message from '../components/message'
import firebase from 'firebase'
import { firebaseConfig } from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('messages')

export default function Messages() {
  const [user, setuser] = useState({})
  const [ChatIDs, setChatIDs] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getChatId()
  }, [user])
  const getChatId = async () => {
    try {
      db
      .collection('messages')
      .where('Chatter', "array-contains", user._id)
      .get()
      .then(querySnapshot => {
        let ChatID = []
        querySnapshot.forEach(doc => {
          return ChatID.push(doc.id)
        })
        setChatIDs(ChatID)
      })
      .catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
    
  }
  // console.log(ChatIDs)
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('USER')
      setuser(JSON.parse(jsonValue))
    } 
    catch(err) {
      console.log(err)
    } 
  }
    return (
      <ScrollView>
            <View style={styles.containerContent}>
              {ChatIDs && ChatIDs.map((ChatID, idx) => (
                <Message key={idx} ChatID={ChatID} user={user}/>
              ))}
            </View>
        </ScrollView>
    )
}