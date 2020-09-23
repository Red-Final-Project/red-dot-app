import React, {useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native' 
import 'firebase/firestore';
import * as firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig'

import Posts from '../components/Post'
import { styles } from '../pages/styles'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
  
const dbAuth = firebase.firestore()
export default function Tabs({navigation}) {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const getPosts = () => {
        dbAuth.collection('posts')
        .orderBy("deadline", "asc")
        .get()
        .then(function(querySnapshot) {
            const data = []
            querySnapshot.forEach(function(doc) {
                data.push(doc.data())
            })
            setPosts(data)
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    useEffect(() => {
        getPosts()
        const unsubscribe = navigation.addListener('focus', () => {
            getPosts()
        })
        return unsubscribe 
    }, [])
    if(!posts) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.fluid}>
                    {posts.map((post, idx) => (
                        <Posts key={idx} index={idx} post={post} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

