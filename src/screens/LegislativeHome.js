import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import USMap from "../components/USMap";
import { firebase } from '../firebase/config'

import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function LegislativeHome({ route, navigation }) {

  const onLogOutPress = () => {
    console.log("User:", route.params)
    firebase
    .auth()
    .signOut()
    .then(
      console.log("Signed Out Successfully"),
      // need to add to navigate back to sign up page
      navigation.navigate('Login')
      )
    .catch(error => {
        alert(error)
  })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
            style={styles.button}
            onPress={() => onLogOutPress()}>
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
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

      <Button onPress={() => navigation.navigate("Compare")}>
        Go to Compare Members Screen
      </Button>
      <Button onPress={() => navigation.navigate("Single Member")}>
        Go to Single Member Screen
      </Button>
      <Button onPress={() => navigation.navigate("Bills")}>Go to Bills</Button>
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
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  }
});
