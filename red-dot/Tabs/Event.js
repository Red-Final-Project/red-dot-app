import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { styles } from '../pages/styles';

import firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';
import {} from 'react-native-gesture-handler';
// const { width: styles.screenWidth } = Dimensions.get('window');
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);
const db = firebase.firestore();
const eventsRef = db.collection('events');

export default function Tabs({ navigation, route }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState('')

  // navigation.setOptions({ title: route.name });
  // console.log(route);

  useEffect(() => {
    (async () => {
      const result = await eventsRef.get();
      const mapResult = result.docs.map((doc) => doc.data());
      const filteredResult = mapResult.filter((e) => e.title);
      setEvents(filteredResult);
    })();
  }, []);
  // useEffect(() => {
  //   console.log('called');
  // }, []);

  // useLayoutEffect(() => {
  //   navigation.setOptions({

  //     headerRight: () => (
  //       <View style={styles.row}>
  //         <Button
  //           icon={{
  //             name: 'user',
  //             size: 18,
  //             color: COLORS.primary,
  //             type: 'simple-line-icon',
  //           }}
  //           onPress={() => navigation.navigate('AddRequest')}
  //           buttonStyle={{ backgroundColor: 'red' }}
  //         />
         
  //       </View>
  //     ),
  //   });
  // }, [navigation]);
  // setValue(route.params.title)
  // useLayoutEffect(() => {
  //   console.log(route.params, '<<<');
  //   navigation.setOptions({
  //     // title: value === '' ? 'No title' : value,
  //   });
  // }, [navigation, value]);
  // useLayoutEffect(() => {
    
  //   console.log('called');
  // },[navigation])

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

  if (!events) return <></>;
  return (
    <View style={styles.container}>
      <View style={styles.titlesCont}>
        <Text style={styles.titles}>Event</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
          <Text style={styles.addRequest}>Add Event</Text>
        </TouchableOpacity>
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
