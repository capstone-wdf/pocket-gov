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
    console.log('specific bill', specificBill.bill);
  };

  if (!bill) {
    callGetSpecificBill();
  }

  return (
    <ScrollView style={styles.container}>
      <Title>{bill.bill}</Title>
  <Subheading>{bill.title}</Subheading>
  <Text>{`Sponsored by ${bill.sponsor_title} ${bill.sponsor}`}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
