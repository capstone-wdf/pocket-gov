import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Card, Paragraph, Text, Title, Subheading } from 'react-native-paper';

export default function UpcomingBill({ bill_number, description }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Subheading>{bill_number}</Subheading>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350
  }
})
