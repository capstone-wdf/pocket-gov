import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LegislativeHome, JudicialHome, ExecutiveHome } from './index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === 'Legislative') {
              iconName = 'gavel';
            } else if (route.name === 'Judicial') {
              iconName = 'fountain-pen';
            } else {
              iconName = 'book-open-variant';
            }
            return (
              <MaterialCommunityIcons name={iconName} size={24} color="blue" />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
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
