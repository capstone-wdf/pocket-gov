import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

import {
  Appbar,
  Avatar,
  Button,
  List,
  Menu,
  Text,
  Title,
  Subheading,
} from "react-native-paper";
import axios from "axios";
import { config } from "../../secrets";
import {
  VictoryPie,
  VictoryStack,
  VictoryBar,
  VictoryLabel,
  VictoryLegend,
} from "victory-native";
import SingleBill from "../components/SingleBill";

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

async function compareBillSponsorships(
  firstmemberid,
  secondmemberid,
  congress,
  chamber
) {
  const theUrl = `https://api.propublica.org/congress/v1/members/${firstmemberid}/bills/${secondmemberid}/${congress}/${chamber}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    return data.results[0];
  } catch (error) {
    console.error(error);
  }
}

export default function CompareMembers({ navigation }) {
  const [members, setMembers] = useState([]);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [agreeData, setAgreeData] = useState(null);
  const [switchView, setSwitchView] = useState(false);
  const [chamber, setChamber] = useState("senate");
  const [sponsorships, setSponsorships] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log("MEMBER1 PROPUBLICA PROPER", member1);

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

  //useEffect for bill comparison API
  useEffect(() => {
    if (member1 && member2) {
      getSponsorships(member1.id, member2.id);
    }
  }, [member1, member2]);

  //other stuff
  let congress = "117";

  const apiCall = async () => {
    let response = await getMembers(congress, chamber);
    setMembers(response);
  };

  //members.length might always be 0 due to state refresh on page? maybe? -EZ
  if (!members.length) {
    apiCall();
  }

  //switch from senate to house
  if (members.length < 105 && members.length > 0 && chamber === "house") {
    setMember1(null);
    setMember2(null);
    setMembers([]);
    setSponsorships(null);
    apiCall();
  }

  //switch from house to senate
  if (members.length > 105 && members.length > 0 && chamber === "senate") {
    setMember1(null);
    setMember2(null);
    setMembers([]);
    setSponsorships(null);
    apiCall();
  }

  //render members dropdown
  const renderMembers = (memberState, num) => {
    let filteredMembers = members;
    if (member1) {
      filteredMembers = filteredMembers.filter((rep) => rep.id !== member1.id);
    }
    if (member2) {
      filteredMembers = filteredMembers.filter((rep) => rep.id !== member2.id);
    }

    if (num === 1) {
      return filteredMembers.map((member) => {
        return (
          <Menu.Item
            title={`${member.last_name}, ${member.first_name} (${member.party})`}
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
      });
    }
    return filteredMembers.map((member) => {
      return (
        <Menu.Item
          title={`${member.last_name}, ${member.first_name} (${member.party})`}
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
    });
  };

  //compare voting records
  const getComparison = async (firstMemberId, secondMemberId) => {
    let compareTwoMemsData = await compareTwoMembers(
      firstMemberId,
      secondMemberId,
      congress,
      chamber
    );
    setAgreeData(compareTwoMemsData);
  };

  //compare bill sponsorships
  const getSponsorships = async (firstMemberId, secondMemberId) => {
    let compareSponsorshipsData = await compareBillSponsorships(
      firstMemberId,
      secondMemberId,
      congress,
      chamber
    );
    setSponsorships(compareSponsorshipsData);
  };

  //Render SingleBill component
  const renderItem = ({ item }) => {
    const billSlug = item.number.split(".").join("");

    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Specific Bill", { bill_slug: billSlug });
        }}
      >
        <SingleBill title={item.title} number={item.number} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#177388" }}>
        <Appbar.Content title="Compare Members of Congress" />
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title>
          {chamber === "senate"
            ? `Compare Two Senators`
            : `Compare Two Representatives`}
        </Title>
        <Button
          onPress={() => setChamber(chamber === "senate" ? "house" : "senate")}
        >
          switch chamber
        </Button>

        <View style={styles.menuContainer}>
          <View>
            <Menu
              visible={visible1}
              onDismiss={closeMenu1}
              anchor={
                <Button onPress={openMenu1}>
                  {chamber === "senate" ? "1st senator" : "1st representative"}
                </Button>
              }
            >
              {/* {members.map((member) => {
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
              })} */}

              {renderMembers(member2, 1)}
            </Menu>
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
          </View>

          <View>
            <Menu
              visible={visible2}
              onDismiss={closeMenu2}
              anchor={
                <Button onPress={openMenu2}>
                  {chamber === "senate" ? "2nd senator" : "2nd representative"}
                </Button>
              }
            >
              {/* {members &&
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
                })} */}

              {renderMembers(member1, 2)}
            </Menu>
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
        </View>
        {/* <View style={styles.memberContainer}>
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
        </View> */}
        {agreeData && member1 && member2 && (
          <View style={styles.dataContainer}>
            <Subheading style={{ fontWeight: "700" }}>
              Voting Records
            </Subheading>
            <View style={styles.textContainer}>
              <Text>{`${member1.short_title} ${member1.last_name} and ${member2.short_title} ${member2.last_name} agree ${agreeData.agree_percent}% of the time and have ${agreeData.common_votes} votes in common`}</Text>
              {/* <Text>{`Agree percent: ${agreeData.agree_percent}`}</Text>
              <Text>{`Common votes: ${agreeData.common_votes}`}</Text>
              <Text>{`Disagree percent: ${agreeData.disagree_percent}`}</Text>
              <Text>{`Disagree votes: ${agreeData.disagree_votes}`}</Text> */}
            </View>
            <View>
              {!switchView ? (
                <>
                  <View
                    style={{
                      backgroundColor: "#E4572E",
                      height: "30%",
                      width: "74%",
                      left: "13%",
                      top: "35%",
                      position: "absolute",
                    }}
                  ></View>
                  <VictoryStack
                    height={100}
                    horizontal={true}
                    colorScale={["#62AF5A", "#E4572E"]}
                  >
                    <VictoryBar
                      animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                      }}
                      labelComponent={
                        <VictoryLabel
                          style={[{ fill: "#62AF5A" }]}
                          x={50}
                          capHeight={2}
                          textAnchor="start"
                          verticalAnchor="start"
                          text="Agree"
                          labels={({ datum }) => datum.y}
                        />
                      }
                      height={100}
                      data={[
                        {
                          x: `Agree ${agreeData.agree_percent}%`,
                          y: agreeData.agree_percent,
                        },
                      ]}
                      barWidth={30}
                    />

                    <VictoryBar
                      labelComponent={
                        <VictoryLabel
                          x={277}
                          style={[{ fill: "#E4572E" }]}
                          capHeight={11.5}
                          textAnchor="start"
                          verticalAnchor="start"
                          text="Disagree"
                          labels={({ datum }) => datum.y}
                        />
                      }
                      height={100}
                      data={[
                        {
                          x: `Disagree ${agreeData.disagree_percent}%`,
                          y: agreeData.disagree_percent,
                        },
                      ]}
                      barWidth={30}
                    />
                  </VictoryStack>
                </>
              ) : (
                <VictoryPie
                  style={{
                    labels: {
                      fill: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                    },
                  }}
                  labelRadius={40}
                  cornerRadius={({ datum }) => datum.y * 0.1}
                  height={285}
                  radius={({ datum }) => 40 + datum.y * 0.8}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1200 },
                  }}
                  colorScale={["#62AF5A", "#E4572E"]}
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
                />
              )}
            </View>
            <Button onPress={() => setSwitchView(!switchView)}>
              Switch Graph
            </Button>
          </View>
        )}
        {sponsorships && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <Subheading style={{ fontWeight: "700" }}>
              Bill Sponsorships
            </Subheading>
            <Text
              style={styles.textContainer}
            >{`${member1.short_title} ${member1.last_name} and ${member2.short_title} ${member2.last_name} have co-sponsored ${sponsorships.common_bills} bills:`}</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sponsorships.bills}
              renderItem={renderItem}
              keyExtractor={(item) => item.number}
            />
          </View>
        )}
        {/* {sponsorships && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sponsorships.bills}
            renderItem={renderItem}
            keyExtractor={(item) => item.number}
          />
        )} */}
      </ScrollView>
    </View>
  );
}

// {sponsorships &&
//   // sponsorships.bills.map((bill) => (
//   //   <Text key={bill.number}>{bill.title}</Text>
//   ))}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  member: {
    justifyContent: "center",
    alignItems: "center",
  },
  memberContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  text: {
    alignItems: "center",
    margin: 10,
  },
  textContainer: {
    alignItems: "center",
    margin: 10,
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
