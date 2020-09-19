import React from 'react'
import {View, Text, ScrollView, Image} from 'react-native' 
import { styles } from './styles'

export default function Tabs() {
    return (
        <ScrollView>
            <View style={styles.containerContent}>
                <View style={styles.messageCard}>
                    <View style={styles.messagePhoto}>
                        <Image style={styles.messageProfile} source={{
                            uri:'https://images.generated.photos/6WaxySExK-ZQfUziCDMltQiM9U_bE8Q0kzrklvnqvqs/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwMzcyMzQuanBn.jpg'
                        }} 
                        />
                    </View>
                    <View style={styles.messageContent}>
                        <Text style={styles.messageName}>Johan Python</Text>
                        <Text style={styles.messageValue}>Hanya Test Satu dua tiga empat lim...</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}