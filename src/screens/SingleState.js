import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { individualStates } from "../components/IndividualStates2";
import Svg, { Path, Defs, G } from "react-native-svg";
import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function SingleState({ route }) {
  const currentStatePath = individualStates[route.params.state];
  console.log(route.params.state);
  return (
    <View style={styles.container}>
      <View style={styles.map}>{currentStatePath}</View>
      <View style={styles.reps}>
        <View>
          <Text>Senators</Text>
        </View>
        <View>
          <Text> House of Representatives</Text>
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
    backgroundColor: "violet",
    padding: "3%",
  },
  reps: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
});
