import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function LegislativeHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Legislative Home</Text>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
