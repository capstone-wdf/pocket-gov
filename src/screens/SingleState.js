import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Title, Avatar } from "react-native-paper";
import { individualStates } from "../components/IndividualStates2";
import { config } from "../../secrets";
import axios from "axios";

export default function SingleState({ route, navigation }) {
  const currentStatePath = individualStates[route.params.state];
  const [senate, setSenate] = useState([]);
  const [house, setHouse] = useState([]);
  const [pseudoCache, setPseudoCache] = useState({});

  const loadReps = async () => {
    //need higher-level state or real caching for this to work
    //does a new API call every time
    if (pseudoCache[route.params.state]) {
      setSenate(pseudoCache[route.params.state].senate);
      setHouse(pseudoCache[route.params.state].house);
    } else {
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

        // setPseudoCache({
        //   ...pseudoCache,
        //   [route.params.state]: { senate, house },
        // });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    loadReps();
  }, []);

  const handlePageChange = (chamber, id) => {
    const selectedRep = chamber.filter((reps) => reps.id === id)[0];
    console.log(selectedRep);
    navigation.navigate("Single Member", { selectedRep });
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>{currentStatePath}</View>
      <View style={styles.reps_container}>
        <View style={{ alignItems: "center" }}>
          <Title>{route.params.state}</Title>

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
                    <Text>{`${senator.last_name} (${senator.party})`}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Title> House of Representatives</Title>
          {/**
          Change from View to something else?
           */}
          <View style={styles.reps} pointerEvents="box-none">
            {house &&
              house.map((rep) => (
                <TouchableWithoutFeedback
                  key={rep.id}
                  onPress={() => handlePageChange(house, rep.id)}
                >
                  <View
                    pointerEvents="auto"
                    style={{ alignItems: "center", padding: "1%" }}
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
          </View>
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
    // backgroundColor: "violet",
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
});
