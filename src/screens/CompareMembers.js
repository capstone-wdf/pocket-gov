import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { config } from '../../secrets';

async function getMembers(congress, chamber) {
  const theUrl = `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0].members;
    return result;
  } catch (error) {
    console.error(error);
  }
}

// async function main() {
//   let congress = '116';
//   let senate = 'senate';
//   let members = await getMembers(congress, senate);
//   return members;
// }

export default function CompareMembers() {
  const [members, setMembers] = useState([]);
  let congress = '116';
  let senate = 'senate';

  const apiCall = async () => {
    let response = await getMembers(congress, senate);
    setMembers(response);
  };

  apiCall()

  const Item = ({ title, location }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{location}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={`${item.first_name} ${item.last_name}`} location={item.state} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
