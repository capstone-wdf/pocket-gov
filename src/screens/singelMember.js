import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
} from "react-native";
import { Avatar, Button, Menu, Text } from "react-native-paper";
import axios from "axios";
import { config } from "../../secrets";
import { VictoryPie, VictoryStack, VictoryBar } from "victory-native";
import { firebase } from "../firebase/config";

// const rssParser = require("react-native-rss-parser");
import * as rssParser from "react-native-rss-parser";

async function fetchUserData() {
  //function invocation was commented out to not clutter console -EZ
  const theUrl = "https://www.blumenthal.senate.gov/rss/feeds/?type=press";
  try {
    const { data } = await axios.get(theUrl);
    const rss = await rssParser.parse(data);
    // console.log(rss);
  } catch (error) {
    console.error(error);
  }
}

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

export default function CompareMembers({ route, navigation }) {
  const [members, setMembers] = useState([]);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);

  const [visible1, setVisible1] = useState(false);

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  console.log("MEMBER1", member1);
  console.log("MEMBER2", member2);

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

  useEffect(() => {
    const selectedRep = route.params.selectedRep;
    setMember1({
      id: selectedRep.id,
      first_name: selectedRep.first_name,
      last_name: selectedRep.last_name,
      party: selectedRep.current_party,
      twitter_account: selectedRep.twitter_account,
      facebook_account: selectedRep.facebook_account,
      youtube_account: selectedRep.youtube_account,
      url: selectedRep.url,
      votes_against_party_pct: selectedRep.roles[0].votes_against_party_pct,
      votes_with_party_pct: selectedRep.roles[0].votes_with_party_pct,
      contact_form: selectedRep.roles[0].contact_form,
    });
  }, []);
  //commented out for now to not clutter log -EZ
  // console.log(members);
  // fetchUserData();

  const onFollowPress = () => {
    console.log("Foo: ", route);
    firebase
      .firestore()
      .collection("users")
      .doc(route.params.user.id)
      .get()
      .then((doc) =>
        firebase
          .firestore()
          .collection("users")
          .doc(route.params.user.id)
          .update({ members: doc.data().members + [member1.id] })
      );
  };

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
                    setMember2({
                      first_name: member.first_name,
                      last_name: member.last_name,
                      id: member.id,
                      party: member.party,
                      last_updated: member.last_updated,
                      phone: member.phone,
                      votes_against_party_pct: member.votes_against_party_pct,
                      votes_with_party_pct: member.votes_with_party_pct,
                      twitter_account: member.twitter_account,
                      facebook_account: member.facebook_account,
                      youtube_account: member.youtube_account,
                      url: member.url,
                      contact_form: member.contact_form,
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
              <Text>{`${member1.first_name} ${member1.last_name} (${member1.party})`}</Text>
            )}
            {/* {member1 && <Text>{`Party: "${member1.party}"`}</Text>} */}
            {/* {member1 && <Text>{`Last Updated: ${member1.last_updated} `}</Text>} */}
            {/* {member1 && <Text>{`Phone number: ${member1.phone} `}</Text>} */}
            {member1 && (
              <Text>{`disagree: ${member1.votes_against_party_pct} `}</Text>
            )}
            {member1 && (
              <Text>{`agree: ${member1.votes_with_party_pct} `}</Text>
            )}

            {member1 && member1.twitter_account && (
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

            {member1 && (
              <Text
                style={styles.TextStyle}
                onPress={() =>
                  Linking.openURL(
                    `https://www.facebook.com/${member1.facebook_account}/`
                  )
                }
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512`,
                  }}
                />
              </Text>
            )}

            {member1 && (
              <Text
                style={styles.TextStyle}
                onPress={() =>
                  Linking.openURL(
                    `https://www.youtube.com/user/${member1.youtube_account}`
                  )
                }
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `https://www.online-tech-tips.com/wp-content/uploads/2019/07/youtube-1.png.webp`,
                  }}
                />
              </Text>
            )}

            {member1 && (
              <Text
                style={styles.TextStyle}
                onPress={() => Linking.openURL(`${member1.url}`)}
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `https://cdn4.iconfinder.com/data/icons/internet-3-5/512/102-512.png`,
                  }}
                />
              </Text>
            )}
            {member1 && member1.contact_form && (
              <Text
                style={styles.TextStyle}
                onPress={() => Linking.openURL(`${member1.contact_form}`)}
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `https://img.favpng.com/17/10/19/logo-envelope-mail-png-favpng-C2icb0S6z8Fj651JUUtCdrih9.jpg`,
                  }}
                />
              </Text>
            )}
            {member1 && <Button onPress={() => onFollowPress()}>Follow</Button>}
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
