import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import {
  Avatar,
  Button,
  Menu,
  Text,
  Title,
  Card,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';
import { VictoryPie, VictoryStack, VictoryBar } from 'victory-native';
import { firebase } from '../firebase/config';
import { connect } from 'react-redux';
import { updateUserThunk } from '../../redux/app-redux';

// const rssParser = require("react-native-rss-parser");
import * as rssParser from 'react-native-rss-parser';

async function fetchUserData(rss_url) {
  //function invocation was commented out to not clutter console -EZ
  //   const theUrl = `https://www.${name.toLowerCase()}.senate.gov/rss/feeds/?type=press`;
  //   let theUrl = "https://www.blumenthal.senate.gov/rss/feeds/?type=press";

  const theUrl =
    rss_url || 'https://www.blumenthal.senate.gov/rss/feeds/?type=press';

  try {
    const { data } = await axios.get(theUrl);
    const rss = await rssParser.parse(data);
    return rss.items;
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

function SingleMemberScreen({ route, navigation, user, updateUser }) {
  const [members, setMembers] = useState([]);
  const [member1, setMember1] = useState(null);
  const [newsFeed, setNewsFeed] = useState(null);
  const [visible1, setVisible1] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // console.log("ROUTEPARAMSUER", route.params.user);
  console.log('USER', user);
  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  // console.log("MEMBER1", member1);
  // console.log("MEMBER2", member2);

  //useEffect for comparison API

  //other stuff
  let congress = '117';
  let senate = 'senate';

  const apiCall = async () => {
    let response = await getMembers(congress, senate);
    setMembers(response);
  };
  if (!members.length) {
    apiCall();
  }

  const rssCall = async () => {
    let response = await fetchUserData(member1.rss_url);
    setNewsFeed(response);
  };
  if (!newsFeed && member1 && member1.rss_url) {
    rssCall();
  }
  //   console.log(member1);

  useEffect(() => {
    const selectedRep = route.params.selectedRep;
    console.log(selectedRep.rss_url);
    setMember1({
      id: selectedRep.id,
      first_name: selectedRep.first_name,
      last_name: selectedRep.last_name,
      party: selectedRep.current_party,
      twitter_account: selectedRep.twitter_account,
      facebook_account: selectedRep.facebook_account,
      youtube_account: selectedRep.youtube_account,
      url: selectedRep.url,
      rss_url: selectedRep.rss_url,
      votes_against_party_pct: selectedRep.roles[0].votes_against_party_pct,
      votes_with_party_pct: selectedRep.roles[0].votes_with_party_pct,
      contact_form: selectedRep.roles[0].contact_form,
      next_election: selectedRep.roles[0].next_election,
      bills_sponsored: selectedRep.roles[0].bills_sponsored,
      bills_cosponsored: selectedRep.roles[0].bills_cosponsored,
      total_votes: selectedRep.roles[0].total_votes,
      missed_votes: selectedRep.roles[0].missed_votes,
      committees: selectedRep.roles[0].committees,
    });
  }, []);
  //commented out for now to not clutter log -EZ
  // console.log(members);
  fetchUserData();

  const onFollowPress = async () => {
    try {
      await updateUser(user.id, member1.id);
      console.log('user state after update u:', user, member1.id);
      // navigation.navigate('singelMember')
    } catch (error) {
      console.log('Follow Error', error);
    }
  };

  const onRedirectToLogin = async () => {
    try {
      setVisible(false);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Redirect Error', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.cards}>
        <Card.Content>
          <Text title={item.title}>{item.title} </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.contentContainer}>
      <ScrollView>
        {member1 && (
          <View style={styles.photoContainer}>
            <Avatar.Image
              size={275}
              source={{
                uri: `https://theunitedstates.io/images/congress/225x275/${member1.id}.jpg`,
              }}
            />
          </View>
        )}
        <View style={styles.memberContainer}>
          {member1 && member1.first_name && (
            <View>
              <Title>{`${member1.first_name} ${member1.last_name}`}</Title>
              <Text>{`Party: ${
                member1.party === 'D' ? 'Democrat' : 'Republican'
              }`}</Text>

              <Text>{`Agrees with party: ${member1.votes_with_party_pct}% `}</Text>
              <Text>{`Disagrees with party: ${member1.votes_against_party_pct}% `}</Text>
              {/*<Text>{`Phone number: ${member1.phone} `}</Text>*/}
              <Text>{`Next Election: ${member1.next_election}`}</Text>
              <Text>{`Stats for the 117th Session of Congress (Jan. 3rd, 2021 - Jan. 3rd, 2023):`}</Text>
              <Text>{`Bills Sponsored: ${member1.bills_sponsored}`}</Text>
              <Text>{`Bills Cosponsored: ${member1.bills_cosponsored}`}</Text>
              <Text>{`Total Votes: ${member1.total_votes}`}</Text>
              <Text>{`Missed Votes: ${member1.missed_votes}`}</Text>
              <Text>{`Agrees with Party: ${member1.votes_with_party_pct}% `}</Text>
              <Text>{`Disagrees with Party: ${member1.votes_against_party_pct}% `}</Text>
              {member1.phone && (
                <Text>{`Phone Number: ${member1.phone} `}</Text>
              )}

              {member1.rss_url && (
                <View>
                  <Title>Recent News</Title>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatlist}
                    data={newsFeed}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.title}${item.published}`}
                  />
                </View>
              )}

              <View style={styles.AvatarContainer}>
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
              </View>
            </View>
          )}
          {member1 && user.id ? (
            <View>
              {user.members.includes(member1.id) ? (
                <Button>Following</Button>
              ) : (
                <Button onPress={() => onFollowPress()}>Follow</Button>
              )}
            </View>
          ) : (
            <View>
              <Button onPress={showDialog}>Follow</Button>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Hi there 👋 </Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      Please login to follow members and bills.
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Close</Button>
                    <Button onPress={() => onRedirectToLogin()}>Login</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  menu_container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: "space-around",
  },
  memberContainer: {
    margin: 10,
  },
  dataContainer: {
    marginHorizontal: 50,
    paddingHorizontal: 10,
  },

  AvatarContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  cards: {
    width: 200,
    height: 150,
    margin: 5,
    backgroundColor: '#D3D3D3',
  },
  flatlist: {
    height: 200,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const mapState = (state) => {
  return {
    user: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateUser: (userId, memberId) =>
      dispatch(updateUserThunk(userId, memberId)),
  };
};

export default connect(mapState, mapDispatch)(SingleMemberScreen);
