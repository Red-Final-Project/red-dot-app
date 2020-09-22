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
  
let dbAuth = firebase.firestore()
export default function Tabs({navigation}) {
    const [posts, setPosts] = useState([])
    const getPosts = () => {
        dbAuth.collection('posts')
        .orderBy("deadline", "desc")
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
            <View style={styles.titlesCont}>
                <Text style={styles.titles}>My Time Line</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddRequest')}>
                    <Text style={styles.addRequest}>
                        Add Request
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                style={{marginBottom: 40}}
            >
                <View style={styles.fluid}>
                    {posts.map((post, idx) => (
                        <Posts key={idx} post={post} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

