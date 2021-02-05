import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Searchbar, Text } from "react-native-paper";
import USMap from "../components/USMap";
import { gCloudKey } from "../../secrets";
import axios from "axios";

import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function LegislativeHome({ navigation }) {
  const [search, setSearch] = useState("");
  console.log(search);

  const handleSearch = async () => {
    try {
      const query = {
        key: gCloudKey,
        inputtype: "textquery",
        input: search,
      };
      const result = await axios.get(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        { params: query }
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.billsreps}>
        {/*
      Make swipable from left to right, bills to representatives?
       */}
        <Button>Bills</Button>
        <Button>Representatives</Button>
      </View>

      <Searchbar
        placeholder="Enter location"
        value={search}
        onChangeText={(query) => setSearch(query)}
        onSubmitEditing={handleSearch}
      />

      <ZoomView style={styles.map} maxZoom={2} minZoom={1}>
        <USMap navigation={navigation} />
      </ZoomView>

      <View style={styles.branchbar}>
        <Button>Judicial</Button>
        <Button>Executive</Button>
        <Button>Legislative</Button>
      </View>

      <Text>Legislative Home</Text>
      <Button
        title="Go to Compare Members Screen"
        onPress={() => navigation.navigate("Compare")}
      />
      <Button
        title="Go to Single Member Screen"
        onPress={() => navigation.navigate("Single Member")}
      />
      <Button
        title="Go to Bills"
        onPress={() => navigation.navigate("Bills")}
      />
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
