import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
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
import FollowingScreen from "./src/screens/FollowingScreen";

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

function Home({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#177388" },
      }}
    >
      <Stack.Screen
        options={{
          title: "PocketGov",
          headerRight: () => (
            <IconButton
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen
        options={({ route }) => ({
          title: `${route.params.selectedRep.first_name} ${route.params.selectedRep.last_name}`,
        })}
        name="Single Member"
        component={singleMember}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.state.toUpperCase() })}
        name="Single State"
        component={SingleState}
      />
      <Stack.Screen name="Specific Bill" component={SpecificBill} />
      <Stack.Screen name="Search Bills" component={Bills} />
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        name="Following"
        component={FollowingScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        name="My Representatives"
        component={MyReps}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PaperProvider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContentOptions={{
              activeTintColor: "#177388",
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Search Elected Officials" component={MyReps} />
            <Drawer.Screen
              name="Compare Members of Congress"
              headerShown
              component={CompareMembers}
            />
            <Drawer.Screen name="Search Bills" component={Bills} />
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
