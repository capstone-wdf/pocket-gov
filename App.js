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
import { LoginScreen, RegistrationScreen } from "./src/screens";
import { firebase } from "./src/firebase/config";
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // if (loading) {
  //   console.log("Loading")
  //   return (
  //     <></>
  //   )
  // }

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  console.log("IS USER HERE?", new Date(), user)
  return (
    <PaperProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {user === undefined && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}

          <Stack.Screen name="Legislative">
            {(props) => <LegislativeHome {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="Compare" component={CompareMembers} />
          <Stack.Screen name="Bills" component={Bills} />
          <Stack.Screen name="Single Member" component={singleMember} />
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
