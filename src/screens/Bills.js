import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Appbar,
  Button,
  Menu,
  Searchbar,
  Text,
  Title,
  Subheading,
} from 'react-native-paper';
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

async function searchBills(query) {
  const theUrl = `https://api.propublica.org/congress/v1/bills/search.json?query=${query}`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0].bills;
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function Bills({ navigation }) {
  const [senateRecentBills, setSenateRecentBills] = useState(null);
  const [houseRecentBills, setHouseRecentBills] = useState(null);
  const [upcomingBills, setUpcomingBills] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('introduced');

  const onChangeSearch = (query) => setSearchQuery(query);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const congress = '117';
  const callGetRecentBills = async (chamber) => {
    if (chamber === 'house') {
      let houseBills = await getRecentBills(congress, chamber, type);
      setHouseRecentBills(houseBills);
      console.log('house', type);
    }
    if (chamber === 'senate') {
      let senateBills = await getRecentBills(congress, chamber, type);
      setSenateRecentBills(senateBills);
      console.log('senate', type);
    }
  };

  // effect hook for changing type of recent bill
  //TO DO:
  useEffect(() => {
    let chamber = 'house';
    getRecentBills(congress, chamber, type);
  }, [type]);

  const callGetUpcomingBills = async () => {
    let houseBills = await getUpcomingBills('house');
    let senateBills = await getUpcomingBills('senate');
    let upcomingBothChambers = [...senateBills, ...houseBills];
    setUpcomingBills(upcomingBothChambers);
  };

  if (!senateRecentBills) {
    callGetRecentBills('senate');
  }

  if (!houseRecentBills) {
    callGetRecentBills('house');
  }

  if (!upcomingBills) {
    callGetUpcomingBills();
  }

  const callSearchBills = async () => {
    let result = await searchBills(searchQuery);
    setSearchResults(result);
    if (!searchQuery) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    callSearchBills();
  }, [searchQuery]);

  const renderSingleBill = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Specific Bill', {
          bill_slug: item.bill_slug,
        });
      }}
    >
      <SingleBill title={item.title} number={item.number} />
    </TouchableOpacity>
  );

  const renderUpcomingBill = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Specific Bill', {
          bill_slug: item.bill_slug,
        });
      }}
    >
      <UpcomingBill
        bill_number={item.bill_number}
        description={item.description}
        chamber={item.chamber}
        scheduled_at={item.scheduled_at}
        legislative_day={item.legislative_day}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Bills" />
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      </Appbar.Header>
      <Searchbar
        placeholder="Search Bills"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {searchResults && (
        <View style={styles.billsContainer}>
          <Title>Results</Title>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchResults}
            renderItem={renderSingleBill}
            keyExtractor={(item) => item.bill_id}
          />
        </View>
      )}
      <View style={styles.billsContainer}>
        <Title>Upcoming Bills</Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={upcomingBills}
          renderItem={renderUpcomingBill}
          keyExtractor={(item) => item.bill_id}
        />
        {/* <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>select recent bill type</Button>}
        >
          <Menu.Item
            onPress={() => {
              setType('introduced');
              console.log(type);
            }}
            title="Introduced"
          />
          <Menu.Item
            onPress={() => {
              setType('updated');
              console.log(type);
            }}
            title="Updated"
          />
          <Menu.Item
            onPress={() => {
              setType('active');
              console.log(type);
            }}
            title="Active"
          />
          <Menu.Item
            onPress={() => {
              setType('passed');
              console.log(type);
            }}
            title="Passed"
          />
          <Menu.Item
            onPress={() => {
              setType('enacted');
              console.log(type);
            }}
            title="Enacted"
          />
          <Menu.Item
            onPress={() => {
              setType('vetoed');
              console.log(type);
            }}
            title="Vetoed"
          />
        </Menu> */}
        <Title>Recent Bills in the Senate</Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={senateRecentBills}
          renderItem={renderSingleBill}
          keyExtractor={(item) => item.bill_id}
        />
        <Title>Recent Bills in the House</Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={houseRecentBills}
          renderItem={renderSingleBill}
          keyExtractor={(item) => item.bill_id}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  billsContainer: {
    margin: 10,
  },
});
