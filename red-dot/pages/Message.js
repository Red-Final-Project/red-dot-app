import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, ScrollView, Image, YellowBox} from 'react-native' 
import { styles } from './styles'

import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import { firebaseConfig } from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function Tabs() {
  const [ user, setuser] = useState([])
  const [messages, setMessages] = useState([])

  console.log(user,"<<<< ini user hasil read firebase Auth ")
  useEffect(() => {
    isLoggedIn()
  }, [])

  useEffect(() => {
    // https://firebase.google.com/docs/firestore/query-data/listen
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesOnFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === 'added')
          .map(({ doc }) => {
              const message = doc.data()
              console.log({...message}, "ini chat grup >>>>>>>>>>>")
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate() }
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          // console.log(querySnapshot)
      appendMessages(messagesOnFirestore)
    })
    return () => unsubscribe()
  }, [])

  const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // console.log(user, "<<<< user from firebase")
        setuser({
          _id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        })
      } else {
        console.log("Read data error")
      }
    })
  }

  const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

  const handleSend = async (messages) => {
    const sendData = messages.map((message) => chatsRef.add(message))
    await Promise.all(sendData)
}  

  return (
    <GiftedChat messages={messages} user={{_id: user._id, name: user.name, avatar: user.avatar}} onSend={handleSend} />
  )

    // return (
      // Test chat dulu
      // <ScrollView>
        //     <View style={styles.containerContent}>
        //         <View style={styles.messageCard}>
        //             <View style={styles.messagePhoto}>
        //                 <Image style={styles.messageProfile} source={{
        //                     uri:'https://images.generated.photos/6WaxySExK-ZQfUziCDMltQiM9U_bE8Q0kzrklvnqvqs/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwMzcyMzQuanBn.jpg'
        //                 }} 
        //                 />
        //             </View>
        //             <View style={styles.messageContent}>
        //                 <Text style={styles.messageName}>Johan Python</Text>
        //                 <Text style={styles.messageValue}>Hanya Test Satu dua tiga empat lim...</Text>
        //             </View>
        //         </View>
        //     </View>
        // </ScrollView>
    // )
}