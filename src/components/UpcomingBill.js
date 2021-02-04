import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Card, Paragraph, Text, Title, Subheading } from 'react-native-paper';

export default function UpcomingBill({
  bill_number,
  description,
  chamber,
  scheduled_at,
  legislative_day,
}) {
  const scheduledAt = new Date(scheduled_at).toLocaleDateString();
  const legislativeDay = new Date(legislative_day).toLocaleDateString();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Subheading>{bill_number}</Subheading>
        <Text>{chamber[0].toUpperCase() + chamber.slice(1)}</Text>
        {description ? <Paragraph>{description}</Paragraph> : <Text>No description</Text>}
        <Text>{`Scheduled at: ${scheduledAt}`}</Text>
        <Text>{`Legislative day: ${legislativeDay}`}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
  },
});
