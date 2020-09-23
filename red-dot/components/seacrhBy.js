import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {styles} from '../pages/styles'
export default function SeacrchCard({card}) {
    const navigation = useNavigation()
    const countThreeMonth = () => {
        let lastDonor = new Date(card.last_donation_date)
        lastDonor.setMonth(lastDonor.getMonth() + 3)
        if(lastDonor < new Date() === false) return 'Unavailable'
        else return "Available"
    }
    return (
        <View style={styles.searchCard}>
            <View style={styles.row}>
                <Text style={{fontFamily: 'Ubuntu-Regular'}}>Name: {card.name}</Text>
                <Text style={styles.available}>{countThreeMonth()}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{fontFamily: 'Ubuntu-Regular'}}>Last Donor Date:  {card.last_donation_date}</Text>
                <TouchableOpacity style={styles.requestSearchBtn} onPress={() => navigation.navigate('Chat', {
                    chatee: {
                        _id: card._id,
                        avatar: card.profile_picture.uri,
                        name: card.name
                    }
                })}>
                    <Text style={styles.requestSearchTextBtn}>Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 