import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { gCloudKey } from '../../secrets';
import axios from 'axios';
export default function MyReps() {
  const [search, setSearch] = useState('');
  const [localFeed, setLocalFeed] = useState(null);
  const handleSearch = async () => {
    try {
      const query = {
        key: gCloudKey,
        address: search,
      };
      // console.log("QUERY", query);
      // "https://www.googleapis.com/civicinfo/v2/elections?key=<AIzaSyADf6v1kNJOwDf1vFwj9hQuIgY2rHb0Ghs>"
      // "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
      //"https://www.googleapis.com/civicinfo/v2/representatives"
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
    let response = await handleSearch();
    // console.log("RESPONSE", response);
    setLocalFeed(response);
    // if (!search) {
    //   setLocalFeed([]);
    // }
  };
  // }
  if (!localFeed && search) {
    getLocalFeed();
  }
  useEffect(() => {
    getLocalFeed();
  }, [search]);
  // console.log("SEARCH", search);
  // console.log("LOCAL FEED", localFeed);
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
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Enter location"
        value={search}
        onChangeText={(query) => setSearch(query)}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.myRepsContainer}>
        <FlatList
          data={myRepsInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
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
