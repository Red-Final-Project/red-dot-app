import React, {useState} from 'react'
import {View, Text, ScrollView, Picker, TouchableOpacity, SafeAreaView} from 'react-native' 

import {styles} from '../pages/styles'
export default function Tabs({navigation}) {
    const [bloodType, setBloodType] = useState('')
    return (
        <SafeAreaView>
            <View style={styles.titlesCont}>
                <Text style={styles.titles}>Search Donor</Text>
            </View>
            <View style={styles.searchForm}>
                <Text>Select Blood Type:</Text>
                <Picker 
                    style={styles.registerInput}
                    label="-- Choose Type --"
                    selectedValue={bloodType}
                    onValueChange={(val) => setBloodType(val)}
                >
                    <Picker.Item label="-- Choose Type --" value='' />
                    <Picker.Item label="A" value="A"/>
                    <Picker.Item label="B" value="B"/>
                    <Picker.Item label="AB" value="AB"/>
                    <Picker.Item label="O" value="O"/>
                </Picker>
            </View>
            <ScrollView
                onScrollBeginDrag={() => navigation.setOptions({tabBarVisible: true})} 
                onScroll={() => navigation.setOptions({tabBarVisible: false})}
                style={{marginBottom: 55}}
            >
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchCard}>
                    <View style={styles.row}>
                        <Text>Name: Arduino Gucci</Text>
                        <Text style={styles.available}>Available</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Last Donor Date:  17/8/2020</Text>
                        <TouchableOpacity style={styles.requestSearchBtn}>
                            <Text style={styles.requestSearchTextBtn}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}