import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Menu, Text, Title, Subheading } from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';
import SingleBill from '../components/SingleBill';
import UpcomingBill from '../components/UpcomingBill';

//type = introduced, updated, active, passed, enacted or vetoed
async function getRecentBills(congress, chamber, type) {
  const theUrl = `https://api.propublica.org/congress/v1/${congress}/${chamber}/bills/${type}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0].bills;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getUpcomingBills(chamber) {
  const theUrl = `https://api.propublica.org/congress/v1/bills/upcoming/${chamber}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0].bills;
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function Bills() {
  const [recentBills, setRecentBills] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);

  const congress = '117';
  const chamber = 'house';
  const type = 'introduced';
  const callGetRecentBills = async () => {
    let response = await getRecentBills(congress, chamber, type);
    setRecentBills(response);
  };

  const callGetUpcomingBills = async () => {
    let response = await getUpcomingBills(chamber);
    setUpcomingBills(response);
  };

  if (!recentBills.length) {
    callGetRecentBills();
  }

  if (!upcomingBills.length) {
    callGetUpcomingBills();
  }

  const renderSingleBill = ({ item }) => (
    <SingleBill title={item.title} number={item.number} />
  );

  const renderUpcomingBill = ({ item }) => (
    <UpcomingBill bill_number={item.bill_number} description={item.description} />
  );

  return (
    <View style={styles.container}>
      <View>
        <Title>Upcoming Bills</Title>
        <FlatList
          horizontal
          data={upcomingBills}
          renderItem={renderUpcomingBill}
          keyExtractor={(item) => item.bill_id}
        />
        <Title>Recent Bills</Title>
        <FlatList
          horizontal
          data={recentBills}
          renderItem={renderSingleBill}
          keyExtractor={(item) => item.bill_id}
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
});
