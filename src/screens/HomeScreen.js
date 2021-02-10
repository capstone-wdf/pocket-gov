import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, IconButton, Menu, Text } from 'react-native-paper';
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
            } else if (route.name === 'Executive') {
              iconName = 'fountain-pen';
            } else {
              iconName = 'book-open-variant';
            }
            return (
              <MaterialCommunityIcons name={iconName} size={24} color={Colors.cyan700}/>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.cyan700,
          inactiveTintColor: Colors.gray900,
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
