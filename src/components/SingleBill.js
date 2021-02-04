import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Card, Paragraph, Text, Title, Subheading } from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';
import { VictoryPie, VictoryStack, VictoryBar } from 'victory-native';

export default function SingleBill({ title, number }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Subheading>{number}</Subheading>
        <Paragraph>{title}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350
  }
})
