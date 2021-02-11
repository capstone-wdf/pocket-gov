import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Button, Menu, Text } from "react-native-paper";
import USMap from "../components/USMap";
import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { stateNames, usStates } from "../components/usStates";

function LegislativeHome({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  // const handleSearch = async () => {
  //   try {
  //     const query = {
  //       key: gCloudKey,
  //       inputtype: "textquery",
  //       input: search,
  //     };
  //     const {
  //       data,
  //     } = await axios.get(
  //       "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  //       { params: query }
  //     );

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onLogOutPress = () => {
  //   logOutUser();
  //   console.log("User logged out, USER:", user);
  //   navigation.navigate("Legislative");
  // };

  // const onFollowingPress = () => {
  //   navigation.navigate("Following", { user });
  // };
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
      <View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Select a state</Button>}
        >
          {generateMenuItems(usStates)}
        </Menu>
      </View>

      <ZoomView style={styles.map} maxZoom={2} minZoom={1}>
        <USMap navigation={navigation} />
      </ZoomView>
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
  billsreps: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    height: "5%",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1,
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
  branchbar: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
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
});

export default LegislativeHome;
