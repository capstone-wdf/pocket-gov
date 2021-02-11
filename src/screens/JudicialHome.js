import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';

export default function JudicialHome() {
  return (
    <ScrollView style={styles.container}>
      <List.Item
        title="John G. Roberts, Jr."
        description="Chief Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Roberts_8807-16_Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Clarence Thomas"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Thomas_9366-024_Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Stephen G. Breyer"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Breyer_8664-13-Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Samuel A. Alito"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Alito_9264-001-Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Sonia Sotomayor"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Sotomayor_9841-001-Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Elena Kagan"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Kagan_10713-017-Crop.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Neil M. Gorsuch"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Gorsuch2.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Brett M. Kavanaugh"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.supremecourt.gov/about/justice_pictures/Kavanaugh%2012221_005_crop.jpg',
            }}
          />
        )}
      />
       <List.Item
        title="Amy Coney Barrett"
        description="Associate Justice"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/c/ca/Amy_Coney_Barrett.jpg',
            }}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
