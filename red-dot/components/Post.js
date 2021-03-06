import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {styles} from '../pages/styles'

export default function Post({post, index}) {
    const navigation = useNavigation()

    return (
        <View style={index % 2 === 0 ? styles.statusBox1 : styles.statusBox2}>
            <View style={styles.profilePictureFluid}>
                    <View style={styles.photoBot}>
                        <Image source={{uri: post.user.avatar}} 
                            style={styles.statusImage}
                        />
                    </View>
                    <View style={styles.dotBox}>
                        <View style={styles.borderDot}></View>
                    </View>
            </View>
            <View style={styles.statusContent}>
                <View style={styles.statusTitle}>
                    <Text style={styles.statusName}>{post.user.name}</Text>
                    <Text style={styles.deadlineStatus}>{post.deadline}</Text>
                </View>
                <Text style={styles.requestStatus}>Request Blood Type: {post.bloodType}</Text>
                <Text style={styles.requestStatus}>Quantity: {post.quantity} Bags</Text>
                <Text style={styles.statusDescription}>"{post.description}"</Text>
                <View style={styles.btnPosition}>
                    <TouchableOpacity style={styles.btnStatus} 
                        onPress={()=>
                            navigation.navigate('Chat', {chatee:{
                                _id: post.user.id,
                                name: post.user.name,
                                avatar: post.user.avatar
                            }})
                        }>
                        <Text style={styles.contactReqBtn}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
} 