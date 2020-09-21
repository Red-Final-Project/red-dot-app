import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { styles } from '../pages/styles';

import firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';
// const { width: styles.screenWidth } = Dimensions.get('window');
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);
const db = firebase.firestore();
const eventsRef = db.collection('events');

export default function Tabs({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await eventsRef.get();
      const mapResult = result.docs.map((doc) => doc.data());
      setEvents(mapResult);
    })();
  }, []);

  //add test
    useEffect(() => {
    //   (async () => {
    //     const result = await eventsRef.add({
    //       title: 'Lorem ipsum dolor',
    //       img_url: 'https://picsum.photos/300',
    //       eventDate: new Date('30 september 2020'),
    //       location: new firebase.firestore.GeoPoint(
    //         Math.random() * 0.03,
    //         Math.random() * 0.03
    //       ),
    //       description:
    //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    //       createdDate: new Date(),
    //     });
    //   })();
    }, []);
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <View style={{ flex: 1, width: '100%' }}>
          <Image source={{ uri: item.img_url }} style={styles.eventPoster} />
        </View>
        <View style={styles.eventNotes}>
          <Text numberOfLines={1} style={styles.eventTitle}>
            {item.title}
          </Text>
          <Text>{item.eventDate.toDate().toDateString()}</Text>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() =>
              navigation.navigate('EventLocation', {
                event: item,
                events: events,
              })
            }
          >
            <Text style={styles.seeLocationText}>See Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlesCont}>
        <Text style={styles.titles}>Event</Text>
      </View>
      <View style={styles.container}>
        <Carousel
          layout={'default'}
          data={events}
          sliderWidth={styles.screenWidth}
          itemWidth={styles.screenWidth - 100}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        {/* </View> */}
      </View>
    </View>
  );
}
