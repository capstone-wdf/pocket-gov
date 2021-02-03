import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
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

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  const openMenu2 = () => setVisible2(true);
  const closeMenu2 = () => setVisible2(false);

  //useEffect for comparison API
  useEffect(() => {
    if (member1 && member2) {
      getComparison(member1.id, member2.id);
      console.log(agreeData);
    }
  }, [member1, member2]);

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

  const getComparison = async (firstMemberId, secondMemberId) => {
    let compareTwoMemsData = await compareTwoMembers(
      firstMemberId,
      secondMemberId,
      congress,
      senate
    );
    setAgreeData(compareTwoMemsData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu_container}>
        <Menu
          visible={visible1}
          onDismiss={closeMenu1}
          anchor={<Button onPress={openMenu1}>choose member 1</Button>}
        >
          {members.map((member) => {
            return (
              <Menu.Item
                title={`${member.first_name} ${member.last_name}`}
                key={member.id}
                onPress={() => {
                  setMember1({
                    first_name: member.first_name,
                    last_name: member.last_name,
                    id: member.id,
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
          anchor={<Button onPress={openMenu2}>choose member 2</Button>}
        >
          {members &&
            members.map((member) => {
              return (
                <Menu.Item
                  title={`${member.first_name} ${member.last_name}`}
                  key={member.id}
                  onPress={() => {
                    setMember2({
                      first_name: member.first_name,
                      last_name: member.last_name,
                      id: member.id,
                    });
                    closeMenu2();
                    // getComparison(member1.id, member2.id);
                  }}
                />
              );
            })}
        </Menu>
      </View>
      {member1 && member1.first_name && (
        <Avatar.Image
          size={35}
          source={{
            uri: `https://theunitedstates.io/images/congress/225x275/${member1.id}.jpg`,
          }}
        />
      )}
      {member1 && <Text>{`${member1.first_name} ${member1.last_name}`}</Text>}
      {member2 && member2.first_name && (
        <Avatar.Image
          size={35}
          source={{
            uri: `https://theunitedstates.io/images/congress/225x275/${member2.id}.jpg`,
          }}
        />
      )}
      {member2 && <Text>{`${member2.first_name} ${member2.last_name}`}</Text>}



      {agreeData && (
        <View>

          <Button
           onPress={() => setSwitchView(!switchView)}>Switch Graph</Button>

          <Text>{`Agree percent: ${agreeData.agree_percent}`}</Text>
          <Text>{`Common votes: ${agreeData.common_votes}`}</Text>
          <Text>{`Disagree percent: ${agreeData.disagree_percent}`}</Text>
          <Text>{`Disagree votes: ${agreeData.disagree_votes}`}</Text>

          {switchView ? <VictoryStack
            horizontal={true}
            colorScale={["forestgreen", "firebrick"]}
          >
            <VictoryBar
              data={[
                {
                  x: `Agree ${agreeData.agree_percent}%`,
                  y: agreeData.agree_percent,
                },
              ]}
            />
            <VictoryBar
              data={[
                {
                  x: `Disagree ${agreeData.disagree_percent}%`,
                  y: agreeData.disagree_percent,
                },
              ]}
            />
          </VictoryStack> : <VictoryPie
            colorScale={["forestgreen", "firebrick"]}
            data={[
              {
                x: `Agree ${agreeData.agree_percent}%`,
                y: agreeData.agree_percent,
              },
              {
                x: `Disagree ${agreeData.disagree_percent}%`,
                y: agreeData.disagree_percent,
              },
            ]}
          />}

        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu_container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: "space-around",
  },
});
