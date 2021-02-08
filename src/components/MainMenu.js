import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';

export default function MainMenu({ navigation }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="menu" size={20} onPress={openMenu} />}
    >
      <Menu.Item
        onPress={() => navigation.navigate('Legislative')}
        title="Legislative"
      />
      <Menu.Item
        onPress={() => navigation.navigate('Following')}
        title="Following"
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
