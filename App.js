import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LegislativeHome from './src/screens/LegislativeHome';
import CompareMembers from './src/screens/CompareMembers';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'

import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import { firebaseConfig } from "./secrets";

const Stack = createStackNavigator();

export default function App() {

  if (!firebase.apps.length) {
    console.log('Connected to Firebase')
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Legislative" component={LegislativeHome} />
          <Stack.Screen name="Compare" component={CompareMembers} />
        </Stack.Navigator>
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
