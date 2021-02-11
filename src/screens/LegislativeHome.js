import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Button, Menu, Text, Title } from "react-native-paper";
import USMap from "../components/USMap";
import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { stateNames, usStates } from "../components/usStates";

function LegislativeHome({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const generateMenuItems = (arr) => {
    return arr.map((usState) => {
      const fullName = stateNames[usState.id];
      return (
        <Menu.Item
          key={usState.id}
          title={fullName}
          onPress={() => {
            closeMenu();
            navigation.navigate("Single State", {
              state: `${usState.id.toLowerCase()}`,
            });
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Title>Legislative Branch</Title>
        <View style={{ alignItems: "center" }}>
          <Text>
            Find your state's federal representatives from the drop-down or
            interacting with the map!
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Select a state</Button>}
          >
            {generateMenuItems(usStates)}
          </Menu>
        </View>
      </View>

      <ZoomView style={styles.map} maxZoom={2} minZoom={1}>
        <USMap navigation={navigation} />
      </ZoomView>

      <View style={styles.bottom}>
        <Text>* iOS devices might have trouble interacting with the map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  //width HAS to be defined like this for map to work
  map: {
    paddingLeft: "3%",
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 1,
    justifyContent: "flex-start",
  },
  //not currently used
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginBottom: 50,
  },
  //--------
});

export default LegislativeHome;
