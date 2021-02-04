import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Avatar, Button, Menu } from "react-native-paper";
import axios from "axios";
import { config } from "../../secrets";
import { VictoryPie, VictoryStack, VictoryBar } from "victory-native";

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
  const [member1, setMember1] = useState(null);
  const [visible1, setVisible1] = useState(false);

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);

  //useEffect for comparison API

  //other stuff
  let congress = "116";
  let senate = "senate";

  const apiCall = async () => {
    let response = await getMembers(congress, senate);
    setMembers(response);
  };
  if (!members.length) {
    apiCall();
  }
  console.log(members);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.menu_container}>
          <Menu
            visible={visible1}
            onDismiss={closeMenu1}
            anchor={<Button onPress={openMenu1}>choose member 1</Button>}
          >
            {members.map((member) => {
              return (
                <Menu.Item
                  title={`${member.first_name} ${member.last_name} "${member.party}"`}
                  key={member.id}
                  onPress={() => {
                    setMember1({
                      first_name: member.first_name,
                      last_name: member.last_name,
                      id: member.id,
                      party: member.party,
                      last_updated: member.last_updated,
                      phone: member.phone,
                      votes_against_party_pct: member.votes_against_party_pct,
                      votes_with_party_pct: member.votes_with_party_pct,
                      twitter_account: member.twitter_account,
                    });
                    closeMenu1();
                  }}
                />
              );
            })}
          </Menu>
        </View>
        <View style={styles.memberContainer}>
          <View>
            {member1 && member1.first_name && (
              <Avatar.Image
                size={275}
                source={{
                  uri: `https://theunitedstates.io/images/congress/225x275/${member1.id}.jpg`,
                }}
              />
            )}
            {member1 && (
              <Text>{`${member1.first_name} ${member1.last_name} `}</Text>
            )}
            {member1 && <Text>{`Party: "${member1.party}"`}</Text>}
            {member1 && <Text>{`Last Updated: ${member1.last_updated} `}</Text>}
            {member1 && <Text>{`Phone number: ${member1.phone} `}</Text>}
            {member1 && (
              <Text>{`disagree: ${member1.votes_against_party_pct} `}</Text>
            )}
            {member1 && (
              <Text>{`agree: ${member1.votes_with_party_pct} `}</Text>
            )}

            {member1 && (
              <Text
                style={styles.TextStyle}
                onPress={() =>
                  Linking.openURL(
                    `https://twitter.com/${member1.twitter_account}`
                  )
                }
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png`,
                  }}
                />
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menu_container: {
    // flex: 1,
    flexDirection: "row",
    // justifyContent: "space-around",
  },
  memberContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
  },
  dataContainer: {
    marginHorizontal: 50,
    paddingHorizontal: 10,
  },
});
