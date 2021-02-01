import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
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

export default function CompareMembers() {
  const [members, setMembers] = useState([]);
  const [member1, setMember1] = useState({});
  const [member2, setMember2] = useState({});
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  let congress = '116';
  let senate = 'senate';
  const apiCall = async () => {
    let response = await getMembers(congress, senate);
    setMembers(response);
  };

  apiCall();

  const Item = ({ title, location }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{location}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={`${item.first_name} ${item.last_name}`}
      location={item.state}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}
      >
        <Menu.Item
          onPress={() => {
            setMember1({"last_name": "test 1"});
          }}
          title="Member 1"
        />
        <Menu.Item
          onPress={() => {
            setMember2({"last_name": "test 2"});
          }}
          title="Member 2"
        />
      </Menu>
        <Text>{`${member1.last_name}`}</Text>
        <Text>{`${member2.last_name}`}</Text>
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
