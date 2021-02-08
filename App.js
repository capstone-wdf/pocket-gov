import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LegislativeHome from "./src/screens/LegislativeHome";
import CompareMembers from "./src/screens/CompareMembers";
import singleMember from "./src/screens/singelMember";
import Bills from "./src/screens/Bills";
import { LoginScreen, RegistrationScreen, FollowingScreen } from "./src/screens";
import SpecificBill from './src/screens/SpecificBill'
import SingleState from "./src/screens/SingleState";
import { firebase } from "./src/firebase/config";
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';


const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   console.log("Loading")
  //   return (
  //     <></>
  //   )
  // }

  return (
    <PaperProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Legislative">
            {(props) => <LegislativeHome {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Following" component={FollowingScreen} />
          <Stack.Screen name="Compare" component={CompareMembers} />
          <Stack.Screen name="Bills" component={Bills} />
          <Stack.Screen name="Single Member" component={singleMember} />
          <Stack.Screen name="Single State" component={SingleState} />
          <Stack.Screen name="Specific Bill" component={SpecificBill} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
