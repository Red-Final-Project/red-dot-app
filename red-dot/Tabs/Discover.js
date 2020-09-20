import React from 'react'
import {View, Text, ImageBackground} from 'react-native' 

import {styles} from '../pages/styles'

import Map from '../assets/images/map.png'
export default function Tabs() {
    return (
        <View style={styles.container}>
            <ImageBackground source={Map} style={styles.background}>
                <View style={styles.titlesCont}>
                    <Text style={styles.titles}>Discover</Text>
                </View>
            </ImageBackground>
        </View>
        
    )
}