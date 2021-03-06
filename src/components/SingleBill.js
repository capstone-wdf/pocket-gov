import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Card, Paragraph, Text, Title, Subheading } from 'react-native-paper';

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
    width: 350,
    height: 250,
    margin: 10,
  },
});
