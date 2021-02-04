import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Button, Menu, Text, Title } from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';
import { VictoryPie, VictoryStack, VictoryBar } from 'victory-native';

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

async function compareTwoMembers(
  firstmemberid,
  secondmemberid,
  congress,
  chamber
) {
  const theUrl = `https://api.propublica.org/congress/v1/members/${firstmemberid}/votes/${secondmemberid}/${congress}/${chamber}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    return data.results[0];
  } catch (error) {
    console.error(error);
  }
}

export default function CompareMembers() {
  const [members, setMembers] = useState([]);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [agreeData, setAgreeData] = useState(null);
  const [switchView, setSwitchView] = useState(false);
  const [chamber, setChamber] = useState('senate');

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  const openMenu2 = () => setVisible2(true);
  const closeMenu2 = () => setVisible2(false);

  //useEffect for comparison API
  useEffect(() => {
    if (member1 && member2) {
      getComparison(member1.id, member2.id);
    }
  }, [member1, member2]);

  //other stuff
  let congress = '117';

  const apiCall = async () => {
    let response = await getMembers(congress, chamber);
    setMembers(response);
  };
  if (!members.length) {
    apiCall();
  }

  //switch from senate to house
  if (members.length < 105 && members.length > 0 && chamber === 'house') {
    setMember1(null);
    setMember2(null);
    setMembers([]);
    apiCall();
  }

  //switch from house to senate
  if (members.length > 105 && members.length > 0 && chamber === 'senate') {
    setMember1(null);
    setMember2(null);
    setMembers([]);
    apiCall();
  }

  const getComparison = async (firstMemberId, secondMemberId) => {
    let compareTwoMemsData = await compareTwoMembers(
      firstMemberId,
      secondMemberId,
      congress,
      chamber
    );
    setAgreeData(compareTwoMemsData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title>
          {chamber === 'senate'
            ? `Compare Two Senators' Voting Records`
            : `Compare Two Representatives' Voting Records`}
        </Title>
        <Button
          onPress={() => setChamber(chamber === 'senate' ? 'house' : 'senate')}
        >
          switch chamber
        </Button>
        <View style={styles.menuContainer}>
          <Menu
            visible={visible1}
            onDismiss={closeMenu1}
            anchor={
              <Button onPress={openMenu1}>
                {chamber === 'senate' ? '1st senator' : '1st representative'}
              </Button>
            }
          >
            {members.map((member) => {
              return (
                <Menu.Item
                  title={`${member.first_name} ${member.last_name} (${member.party})`}
                  key={member.id}
                  onPress={() => {
                    setMember1({
                      first_name: member.first_name,
                      last_name: member.last_name,
                      id: member.id,
                      party: member.party,
                      state: member.state,
                      short_title: member.short_title,
                    });
                    closeMenu1();
                  }}
                />
              );
            })}
          </Menu>
          <Menu
            visible={visible2}
            onDismiss={closeMenu2}
            anchor={
              <Button onPress={openMenu2}>
                {chamber === 'senate' ? '2nd senator' : '2nd representative'}
              </Button>
            }
          >
            {members &&
              members.map((member) => {
                return (
                  <Menu.Item
                    title={`${member.first_name} ${member.last_name} (${member.party})`}
                    key={member.id}
                    onPress={() => {
                      setMember2({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        id: member.id,
                        party: member.party,
                        state: member.state,
                        short_title: member.short_title,
                      });
                      closeMenu2();
                    }}
                  />
                );
              })}
          </Menu>
        </View>
        <View style={styles.memberContainer}>
          <View style={styles.member}>
            {member1 && member1.first_name && (
              <Avatar.Image
                size={70}
                source={{
                  uri: `https://theunitedstates.io/images/congress/225x275/${member1.id}.jpg`,
                }}
              />
            )}
            {member1 && (
              <Text
                style={styles.text}
              >{`${member1.first_name} ${member1.last_name} (${member1.party}), ${member1.state}`}</Text>
            )}
          </View>
          <View style={styles.member}>
            {member2 && (
              <Avatar.Image
                size={70}
                source={{
                  uri: `https://theunitedstates.io/images/congress/225x275/${member2.id}.jpg`,
                }}
              />
            )}
            {member2 && (
              <Text
                style={styles.text}
              >{`${member2.first_name} ${member2.last_name} (${member2.party}), ${member2.state}`}</Text>
            )}
          </View>
        </View>
        {agreeData && member1 && member2 && (
          <View>
            <View style={styles.textContainer}>
              <Text>{`${member1.short_title} ${member1.last_name} and ${member2.short_title} ${member2.last_name} agree ${agreeData.agree_percent}% of the time and have ${agreeData.common_votes} votes in common`}</Text>
              {/* <Text>{`Agree percent: ${agreeData.agree_percent}`}</Text>
              <Text>{`Common votes: ${agreeData.common_votes}`}</Text>
              <Text>{`Disagree percent: ${agreeData.disagree_percent}`}</Text>
              <Text>{`Disagree votes: ${agreeData.disagree_votes}`}</Text> */}
            </View>
            <View style={styles.graphContainer}>
              {switchView ? (
                <VictoryStack
                  horizontal={true}
                  colorScale={['forestgreen', 'firebrick']}
                >
                  <VictoryBar
                    data={[
                      {
                        x: `Agree ${agreeData.agree_percent}%`,
                        y: agreeData.agree_percent,
                      },
                    ]}
                    barWidth={30}
                  />
                  <VictoryBar
                    data={[
                      {
                        x: `Disagree ${agreeData.disagree_percent}%`,
                        y: agreeData.disagree_percent,
                      },
                    ]}
                    barWidth={30}
                  />
                </VictoryStack>
              ) : (
                <VictoryPie
                  colorScale={['forestgreen', 'firebrick']}
                  data={[
                    {
                      x: `${agreeData.agree_percent}%`,
                      y: agreeData.agree_percent,
                    },
                    {
                      x: `${agreeData.disagree_percent}%`,
                      y: agreeData.disagree_percent,
                    },
                  ]}
                  labelRadius={60}
                />
              )}
            </View>
            <Button onPress={() => setSwitchView(!switchView)}>
              Switch Graph
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  member: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  text: {
    alignItems: 'center',
    margin: 10,
  },
  textContainer: {
    alignItems: 'center',
    margin: 10,
  },
  graphContainer: {},
});
