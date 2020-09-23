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

export default function Message({ChatID}) {
    const [messages, setMessages] = useState(null)
    const navigation = useNavigation()
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
    
    if(!messages) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Chat", {
                    chatee: {...messages.user}
                })}>
                    <View style={styles.messageCard}>
                        <View style={styles.messagePhoto}>
                            <Image style={styles.messageProfile} source={{
                                uri: messages.user.avatar
                            }} 
                            />
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageName}>{messages.user.name}</Text>
                            <Text style={styles.messageValue}>{
                            messages.text.length > 31 ? 
                            messages.text.split('').splice(32, messages.text.length - 32, " ...").join('')
                            : messages.text
                        }</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}