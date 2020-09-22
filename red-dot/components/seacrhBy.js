import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

import {styles} from '../pages/styles'
export default function SeacrchCard({card}) {
    // console.log(card, "from Card")
    const countThreeMonth = () => {
        let lastDonor = new Date(card.last_donation_date)
        // console.log(lastDonor.toLocaleDateString())
        lastDonor.setMonth(lastDonor.getMonth() + 3)
        // return lastDonor.toLocaleDateString()
        if(lastDonor < new Date() === false) return 'Unavailable'
        else return "Available"
    }
    return (
        <View style={styles.searchCard}>
            <View style={styles.row}>
                <Text>Name: {card.name}</Text>
                <Text style={styles.available}>{countThreeMonth()}</Text>
            </View>
            <View style={styles.row}>
                <Text>Last Donor Date:  {card.last_donation_date}</Text>
                <TouchableOpacity style={styles.requestSearchBtn}>
                    <Text style={styles.requestSearchTextBtn}>Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 