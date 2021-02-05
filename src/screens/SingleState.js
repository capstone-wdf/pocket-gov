import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { individualStates } from "../components/IndividualStates2";
import Svg, { Defs, G } from "react-native-svg";
import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function SingleState({ route }) {
  const currentStatePath = individualStates[route.params.state];

  const currentStateMap = (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 959 593`}
    >
      <Defs></Defs>
      <G className="prefix__state" fill="#D0D0D0">
        {currentStatePath}
      </G>
    </Svg>
  );
  return (
    <View style={styles.container}>
      <ZoomView style={styles.map}>{currentStateMap}</ZoomView>
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
  },
  reps: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
});
