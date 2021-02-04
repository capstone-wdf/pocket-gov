import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native-paper";
import USMap from "../components/USMap";
// import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
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
      {/*
          Mess with viewStyle to fix centering
           */}
      <ZoomView style={styles.map}>
        {/* <SvgPanZoom
          canvasHeight={200}
          canvasWidth={270}
          initialZoom={1.2}
          minScale={1.2}
          maxScale={3}
          viewStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <USMap onPress={() => console.log("hi")} />
        </SvgPanZoom> */}
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
  //mess with map to fix centering
  map: {
    paddingLeft: ".5%",
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  branchbar: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
