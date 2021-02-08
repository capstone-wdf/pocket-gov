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
} from './src/screens';
import { firebase } from './src/firebase/config';
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
          <Stack.Screen name="Legislative Branch">
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
          <Stack.Screen name="Executive Branch" component={ExecutiveHome} />
          <Stack.Screen name="Judicial Branch" component={JudicialHome} />
        </Stack.Navigator>
        <Drawer.Navigator initialRouteName="Legislative Branch">
          <Drawer.Screen
            name="Legislative Branch"
            component={LegislativeHome}
          />
          <Drawer.Screen name="Following" component={FollowingScreen} />
          <Drawer.Screen name="My Reps" component={MyReps} />
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
