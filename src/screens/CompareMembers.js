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
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  const openMenu2 = () => setVisible2(true);
  const closeMenu2 = () => setVisible2(false);

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
        visible={visible1}
        onDismiss={closeMenu1}
        anchor={<Button onPress={openMenu1}>choose member 1</Button>}
      >
        {members.map((member) => {
          return (
            <Menu.Item
              title={member.first_name}
              key={member.id}
              onPress={() => {
                setMember1({ first_name: member.first_name });
                closeMenu1();
              }}
            />
          );
        })}
      </Menu>
      <Menu
        visible={visible2}
        onDismiss={closeMenu2}
        anchor={<Button onPress={openMenu2}>choose member 2</Button>}
      >
        {members.map((member) => {
          return (
            <Menu.Item
              title={member.first_name}
              key={member.id}
              onPress={() => {
                setMember2({ first_name: member.first_name });
                closeMenu2();
              }}
            />
          );
        })}
      </Menu>
      <Text>{`${member1.first_name}`}</Text>
      <Text>{`${member2.first_name}`}</Text>
      {/* <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
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
