import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native' 
import { styles } from '../pages/styles'

export default function Tabs({navigation}) {
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
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusBox}>
                        <View style={styles.profilePictureFluid}>
                            <Image source={{uri: 'https://images.generated.photos/fMhR7LSUDtgV9zZE6dFnx007IExrqmGbCRpYnyzOgdU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4Nzk3NTIuanBn.jpg'}} 
                                style={styles.statusImage}
                            />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={styles.statusTitle}>
                                <Text style={styles.statusName}>Marie Kotlin</Text>
                                <Text style={styles.deadlineStatus}>20 Sep 2020</Text>
                            </View>
                            <Text style={styles.requestStatus}>Request Blood Type: A</Text>
                            <Text style={styles.requestStatus}>Quantity: 5 Bags</Text>
                            <Text style={styles.statusDescription}>"Please Help Our Children"</Text>
                            <View style={styles.btnPosition}>
                                <TouchableOpacity style={styles.btnStatus}>
                                    <Text style={styles.contactReqBtn}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

