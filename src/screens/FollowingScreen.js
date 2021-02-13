import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FollowingMembers, FollowingBills } from './index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function FollowingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === 'Members') {
              iconName = 'account-group';
            } else if (route.name === 'Bills') {
              iconName = 'fountain-pen';
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
        <Tab.Screen name="Members" component={FollowingMembers} />
        <Tab.Screen name="Bills" component={FollowingBills} />
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
