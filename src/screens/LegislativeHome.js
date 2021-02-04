import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native-paper";
import USMap from "../components/USMap";

import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function LegislativeHome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.billsreps}>
        {/*
      Make swipable from left to right, bills to representatives?
       */}
        <Button>Bills</Button>
        <Button>Representatives</Button>
      </View>

      <Text
        style={{
          backgroundColor: "violet",
          width: "100%",
          zIndex: 1,
        }}
      >
        searchbarhere
      </Text>

      <ZoomView style={styles.map} maxZoom={1.75} minZoom={1}>
        <USMap />
      </ZoomView>

      <View style={styles.branchbar}>
        <Button>Judicial</Button>
        <Button>Executive</Button>
        <Button>Legislative</Button>
      </View>

      {/* <Button onPress={() => navigation.navigate("Compare")}>
        "Go to Compare Members Screen"
      </Button>
      <Button onPress={() => navigation.navigate("Single Member")}>
        "Go to Single Member Screen"
      </Button> */}
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
  billsreps: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    height: "5%",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1,
  },
  //width HAS to be defined like this for map to work
  map: {
    paddingLeft: "3%",
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  branchbar: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
