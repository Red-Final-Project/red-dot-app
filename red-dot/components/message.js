import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image, YellowBox} from 'react-native' 
import { styles } from '../pages/styles'
import {useNavigation} from '@react-navigation/native'
import firebase from 'firebase'
import { firebaseConfig } from '../firebaseConfig'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])


const db = firebase.firestore()
const chatsRef = db.collection('messages')

export default function Message({ChatID, user}) {
    const [messages, setMessages] = useState(null)
    const [chatee, setChatee] = useState(null)
    const navigation = useNavigation()

    const getChateeId = async () => {
        const chatee_id = await ChatID.split('_').filter(chateeId => chateeId !== user._id)
        db.collection("users").doc(chatee_id.join('')).get()
        .then(doc => {
            // console.log(doc.data(), "data")
            setChatee({_id: chatee_id, ...doc.data()})
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        const unsubscribe = chatsRef.doc(ChatID).collection('chat').onSnapshot(querySnapshot => {
           let messageTmp = []
           querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    messageTmp.push(doc.data())
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            setMessages({...messageTmp[0]})
          })
          return () => unsubscribe()
    }, [])

    useEffect(() => {
        getChateeId()
    }, [messages])
    // console.log(messages)
    if(!messages || !chatee ) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Chat", {
                    chatee: {
                        _id: chatee._id,
                        avatar: chatee.profile_picture.uri,
                        name: chatee.name
                    }
                })}>
                    <View style={styles.messageCard}>
                        <View style={styles.messagePhoto}>
                            <Image style={styles.messageProfile} source={{
                                uri: chatee.profile_picture.uri
                            }} 
                            />
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageName}>{chatee.name}</Text>
                            <Text style={styles.messageValue}>{
                            messages.text.length > 31 ? 
                            `${messages.text.split('').slice(0, 31).join('')}...`
                            : messages.text
                        }</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}