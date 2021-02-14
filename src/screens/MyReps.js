import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, Text, Searchbar } from 'react-native-paper';
import { gCloudKey } from '../../secrets';
import axios from 'axios';

export default function MyReps({ navigation }) {
  const [search, setSearch] = useState('');
  const [localFeed, setLocalFeed] = useState(null);
  const getMyReps = async () => {
    try {
      const query = {
        key: gCloudKey,
        address: search,
      };

      const {
        data,
      } = await axios.get(
        'https://www.googleapis.com/civicinfo/v2/representatives',
        { params: query }
      );
      return data;
      // console.log("DATA", data);
    } catch (error) {
      console.log(error);
    }
  };
  // function localRepScreen({ route, local }) {
  //   console.log("LOCAL", local);
  const getLocalFeed = async () => {
    let response = await getMyReps();
    // console.log("RESPONSE", response);
    setLocalFeed(response);
  };

  let infoObj = {};
  let myRepsInfo = [];
  if (localFeed) {
    let officialNames = localFeed.officials.map((official, idx) => {
      return official.name;
    });
    let officeNames = localFeed.offices.map((office) => {
      if (office.officialIndices.length === 1) {
        infoObj[office.name] = officialNames[office.officialIndices];
      } else if (office.officialIndices.length > 1) {
        infoObj[office.name] = [];
        office.officialIndices.map((idx) => {
          infoObj[office.name].push(officialNames[idx]);
        });
      }
    });
    // console.log(infoObj);
    for (let key in infoObj) {
      if (Array.isArray(infoObj[key])) {
        myRepsInfo.push(`${key}: ${infoObj[key].join(', ')}`);
      } else {
        myRepsInfo.push(`${key}: ${infoObj[key]}`);
      }
    }
    // console.log(myRepsInfo);
  }
  const renderItem = ({ item }) => (
    <Text style={styles.myRepsInfo}>{item}</Text>
  );
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#177388' }}>
        <Appbar.Content title="Bills" />
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      </Appbar.Header>
      <Searchbar
        placeholder="Enter location"
        value={search}
        onChangeText={(query) => setSearch(query)}
        onSubmitEditing={getLocalFeed}
      />
      <View style={styles.myRepsContainer}>
        <FlatList
          data={myRepsInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  myRepsInfo: {
    margin: 5,
  },
  myRepsContainer: {
    margin: 10,
  },
});
