import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Menu,
  Searchbar,
  Text,
  Title,
  Subheading,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';

async function getSpecificBill(congress, bill_slug) {
  const theUrl = `https://api.propublica.org/congress/v1/${congress}/bills/${bill_slug}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0];
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function SpecificBill({ route }) {
  const [bill, setBill] = useState(null);
  const { bill_slug } = route.params;
  const congress = '117';

  const callGetSpecificBill = async () => {
    let specificBill = await getSpecificBill(congress, bill_slug);
    setBill(specificBill);
  };

  useEffect(() => {
    if (!bill) {
      callGetSpecificBill();
    }
  }, [bill]);

  return (
    <ScrollView style={styles.container}>
      {bill && (
        <View>
          <Title>{`${bill.number}`}</Title>
          <Subheading>{bill.title}</Subheading>
          <Text>{`Sponsored by ${bill.sponsor_title} ${bill.sponsor} (${bill.sponsor_party}) ${bill.sponsor_state} and ${bill.cosponsors} cosponsor(s)`}</Text>
          <Text>{`Committees: ${bill.committees}`}</Text>
          <Text>{`The latest major action on this bill: ${bill.latest_major_action}`}</Text>
          <Text>{`The latest major action date: ${bill.latest_major_action_date}`}</Text>
          {bill.active ? (
            <Text>Bill status: active</Text>
          ) : (
            <Text>Bill status: inactive</Text>
          )}
          {bill.house_passage && (
            <Text>{`Passed in the House on ${bill.house_passage}`}</Text>
          )}
          {bill.senate && (
            <Text>{`Passed in the Senate on ${bill.senate}`}</Text>
          )}
          {bill.enacted && <Text>{`Enacted on ${bill.enacted}`}</Text>}
          {bill.vetoed && <Text>{`Vetoed on ${bill.vetoed}`}</Text>}
          <Button>Follow</Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
