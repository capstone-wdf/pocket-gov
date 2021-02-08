import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { LegislativeHome, ExecutiveHome, JudicialHome } from '../screens';

export default function BottomNav() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'legislative', title: 'Legislative', icon: 'book-open-variant' },
    { key: 'executive', title: 'Executive', icon: 'fountain-pen' },
    { key: 'judicial', title: 'Judicial', icon: 'gavel' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    legislative: LegislativeHome,
    executive: ExecutiveHome,
    judicial: JudicialHome,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
