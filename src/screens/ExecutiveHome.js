import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Colors,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';

export default function ExecuitveHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Title>Executive Branch</Title>
      </View>
      <List.Item
        title="Joe Biden"
        description="President"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/joe_hero.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Kamala Harris"
        description="Vice President"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Kamala_Harris.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Antony Blinken"
        description="Secretary of State"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Antony_Blinken.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Dr. Janet Yellen"
        description="Secretary of the Treasury"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Janet_Yellen.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Lloyd Austin"
        description="Secretary of Defense"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Lloyd_Austin.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Merrick Garland"
        description="Attorney General"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Merrick_Garland.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Deb Haaland"
        description="Secretary of the Interior"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Deb_Haaland.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Tom Vilsack"
        description="Secretary of Agriculture"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Tom_Vilsack.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Gina Raimondo"
        description="Secretary of Commerce"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Gina_Raimondo-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Marty Walsh"
        description="Secretary of Labor"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Marty_Walsh-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Xavier Becerra"
        description="Secretary of Health and Human Services"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Xavier_Becerra.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Marcia Fudge"
        description="Secretary of Housing and Urban Development"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Marcia_Fudge.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Pete Buttigieg"
        description="Secretary of Transportation"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Pete_Buttigieg.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Jennifer Granholm"
        description="Secretary of Energy"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Jennifer_Granholm1-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Dr. Miguel Cardona"
        description="Secretary of Education"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Miguel_Cardona-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Denis McDonough"
        description="Secretary of Veterans Affairs"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Denis_McDonough-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Alejandro Mayorkas"
        description="Secretary of Homeland Security"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Alejandro_Mayorkas.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Michael Regan"
        description="Administrator of the Environmental Protection Agency"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Michael_Regan.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Neera Tanden"
        description="Director of the Office of Management and Budget"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Neera_Tanden.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Avril Haines"
        description="Director of National Intelligence"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Avril_Haines-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Katherine Tai"
        description="United States Trade Representative"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Katherine_Tai.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Linda Thomas-Greenfield"
        description="United States Ambassador to the United Nations"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Linda_Thomas-Greenfield.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Dr. Cecilia Rouse"
        description="Chair of the Council of Economic Advisers"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Cecilia_Rouse.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Isabel Guzman"
        description="Administrator of the Small Business Administration"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Isabel_Guzman.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Dr. Eric Lander"
        description="Presidential Science Advisor and Director of the Office of Science and Technology Policy"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Dr_Eric_Lander-600x400.jpg',
            }}
          />
        )}
      />
      <List.Item
        title="Ron Klain"
        description="Chief of Staff"
        left={(props) => (
          <Avatar.Image
            {...props}
            size={70}
            source={{
              uri:
                'https://www.whitehouse.gov/wp-content/uploads/2021/01/Ron_Klain.jpg',
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
  title: {
    alignItems: 'center',
    margin: 10,
  },
});
