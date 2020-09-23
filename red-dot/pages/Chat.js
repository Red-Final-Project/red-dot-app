// @refresh reset

import React, { useEffect, useState, useCallback} from 'react'
import { YellowBox, StyleSheet, View, Text, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import { firebaseConfig } from '../firebaseConfig'
import {styles} from './styles'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('messages')

export default function Chat ({route}){
  const [ user, setuser] = useState([])
  const [messages, setMessages] = useState([])
  const {chatee} = route.params
  
  useEffect(() => {
    isLoggedIn()
  }, [])
  
  const ChatID = () => {
    const chatterID = user._id;
    const chateeID = chatee._id;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join('_');
  }

  useEffect(() => {
    const unsubscribe = chatsRef.doc(ChatID()).collection('chat').onSnapshot(querySnapshot => {
      const messagesOnFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === 'added')
          .map(({ doc }) => {
              const message = doc.data()
              console.log(message)
              return { ...message, createdAt: message.createdAt.toDate() }
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          appendMessages(messagesOnFirestore)
    })
    
    return () => unsubscribe()
  }, [user])
  
  const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
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
    const sendData = messages.map((message) => chatsRef.doc(ChatID()).collection("chat").add(message))
    await Promise.all(sendData)
  }

  return (
      <>
      <View>
        <Image source={chatee.avatar} style={styles.photoChat}/>
          <Text style={styles.titleChat}>{chatee.name}</Text>
      </View>
        <GiftedChat messages={messages} 
        user={{_id: user._id, name: user.name, avatar: user.avatar}} 
        onSend={handleSend} 
        />
      </>
  )
}

