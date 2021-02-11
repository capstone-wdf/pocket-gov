import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";
import { Text, Title, Avatar } from "react-native-paper";
import { individualStates } from "../components/IndividualStates2";
import { config } from "../../secrets";
import axios from "axios";
import { stateNames } from "../components/usStates";

export default function SingleState({ route, navigation }) {
  const currentStatePath = individualStates[route.params.state];
  const [loading, setLoading] = useState(true);
  const [senate, setSenate] = useState([]);
  const [house, setHouse] = useState([]);

  const loadReps = async () => {
    try {
      const senateData = await axios.get(
        `https://api.propublica.org/congress/v1/members/senate/${route.params.state}/current.json`,
        config
      );
      setSenate(senateData.data.results);
      const houseData = await axios.get(
        `https://api.propublica.org/congress/v1/members/house/${route.params.state}/current.json`,
        config
      );
      setHouse(houseData.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadReps();
    setLoading(false);
  }, []);

  const handlePageChange = async (chamber, id) => {
    const { data } = await axios.get(
      `https://api.propublica.org/congress/v1/members/${id}.json`,
      config
    );
    navigation.navigate("Single Member", { selectedRep: data.results[0] });
  };

  //flatlist

  const defaultPic = async (repId, exists) => {
    try {
      await axios.get(
        `https://theunitedstates.io/images/congress/225x275/${repId}.jpg`
      );
      exists = true;
    } catch (error) {
      exists = false;
    }
    return;
  };

  const Item = ({ rep }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handlePageChange(house, rep.id)}>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Avatar.Image
            size={70}
            source={{
              uri: `https://theunitedstates.io/images/congress/225x275/${rep.id}.jpg`,
            }}
          />

          <Text>{`${rep.last_name} (${rep.party})`}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => <Item rep={item} />;

  return (
    <View style={styles.container}>
      <Title>{stateNames[route.params.state.toUpperCase()]}</Title>
      <View style={styles.map}>{currentStatePath}</View>

      <View style={styles.reps_container}>
        <View style={{ alignItems: "center" }}>
          <Title>Senators</Title>
          <View style={styles.reps}>
            {senate &&
              senate.map((senator) => (
                <TouchableWithoutFeedback
                  key={senator.id}
                  onPress={() => handlePageChange(senate, senator.id)}
                >
                  <View style={{ alignItems: "center", padding: "1%" }}>
                    <Avatar.Image
                      size={70}
                      source={{
                        uri: `https://theunitedstates.io/images/congress/225x275/${senator.id}.jpg`,
                      }}
                    />
                    <Text>{`${senator.first_name} ${senator.last_name} (${senator.party})`}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </View>
        <View
          style={{
            alignItems: "center",

            width: "100%",
            height: "100%",
          }}
        >
          <Title>Representatives</Title>

          {/* <ScrollView
            horizontal
            centerContent
            contentContainerStyle={styles.reps2}
          >
            {house &&
              house.map((rep) => (
                <TouchableWithoutFeedback
                  key={rep.id}
                  onPress={() => handlePageChange(house, rep.id)}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Avatar.Image
                      size={70}
                      source={{
                        uri: `https://theunitedstates.io/images/congress/225x275/${rep.id}.jpg`,
                      }}
                    />
                    <Text>{`${rep.last_name} (${rep.party})`}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView> */}

          <FlatList
            numColumns="4"
            // horizontal
            contentContainerStyle={{
              paddingBottom: "35%",
              alignItems: "center",
            }}
            data={house}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
  },
  reps_container: {
    flex: 2,
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  reps: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  reps2: {
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
