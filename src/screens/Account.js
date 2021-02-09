import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';


export default function MainMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>my account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
