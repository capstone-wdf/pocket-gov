import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import USMap from "../components/USMap";

export default function LegislativeHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Legislative Home</Text>
      <View style={styles.map}>
        <USMap onPress={() => console.log("hello")} />
      </View>

      <Button
        title="Go to Compare Members Screen"
        onPress={() => navigation.navigate("Compare")}
      />
      <Button
        title="Go to Single Member Screen"
        onPress={() => navigation.navigate("Single Member")}
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
