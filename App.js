import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, Colors } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  LoginScreen,
  RegistrationScreen,
  FollowingScreen,
  LegislativeHome,
  CompareMembers,
  singleMember,
  Bills,
  SpecificBill,
  SingleState,
  ExecutiveHome,
  JudicialHome,
  MyReps,
} from "./src/screens";
import HomeScreen from "./src/screens/HomeScreen";
// import { firebase } from './src/firebase/config';
import { Provider } from "react-redux";
import { store, logOutUserThunk } from "./redux/app-redux";
import BottomNav from "./src/components/BottomNav";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const user = store.getState();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user.id ? (
        <>
          <DrawerItem
            label="Following"
            onPress={() => {
              props.navigation.navigate("Following");
            }}
          />
          <DrawerItem
            label="Log Out"
            onPress={() => {
              store.dispatch(logOutUserThunk());
              props.navigation.navigate("Legislative");
            }}
          />
        </>
      ) : (
        <>
          <DrawerItem
            label="Log In"
            onPress={() => props.navigation.navigate("Login")}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
}

// function TestContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem label="Test" onPress={() => alert('test')} />
//     </DrawerContentScrollView>
//   );
// }

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PocketGov" component={HomeScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Single Member" component={singleMember} />
      <Stack.Screen name="Single State" component={SingleState} />
      <Stack.Screen name="Specific Bill" component={SpecificBill} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   console.log("Loading")
  //   return (
  //     <></>
  //   )
  // }

  return (
    <Provider store={store}>
      <PaperProvider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContentOptions={{
              activeTintColor: Colors.cyan700,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="My Representatives" component={MyReps} />
            <Drawer.Screen name="Compare Members" component={CompareMembers} />
            <Stack.Screen name="Search Bills" component={Bills} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
