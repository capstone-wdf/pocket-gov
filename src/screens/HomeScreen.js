import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LegislativeHome, JudicialHome, ExecutiveHome } from './index';
const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Legislative">
            {(props) => <LegislativeHome {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Executive" component={ExecutiveHome} />
          <Tab.Screen name="Judicial" component={JudicialHome} />
        </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
