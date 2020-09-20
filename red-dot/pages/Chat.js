// @refresh reset

import React, { useEffect, useState, useCallback} from 'react'
import { YellowBox, StyleSheet, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import { firebaseConfig } from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function Chat (){
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
              //createdAt is firebase.firestore.Timestamp instance
              //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              return { ...message, createdAt: message.createdAt.toDate() }
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
  },
  input: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      padding: 15,
      marginBottom: 20,
      borderColor: 'gray',
  },
})

