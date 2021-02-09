import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
  HomeScreen as PocketGov,
} from './src/screens';
import { firebase } from './src/firebase/config';
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';
import BottomNav from './src/components/BottomNav';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PocketGov" component={PocketGov} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Compare" component={CompareMembers} />
      <Stack.Screen name="Bills" component={Bills} />
      <Stack.Screen name="Single Member" component={singleMember} />
      <Stack.Screen name="Single State" component={SingleState} />
      <Stack.Screen name="Specific Bill" component={SpecificBill} />
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
    <PaperProvider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="My Representatives" component={MyReps} />
          <Drawer.Screen name="Following" component={FollowingScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
