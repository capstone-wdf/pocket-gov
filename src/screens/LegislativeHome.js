import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Searchbar, Text, Chip } from "react-native-paper";
import USMap from "../components/USMap";
import { firebase } from "../firebase/config";
import { gCloudKey } from "../../secrets";
import axios from "axios";
import { connect } from "react-redux";
import { logOutUserThunk } from "../../redux/app-redux";

import ZoomView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

function LegislativeHome({ navigation, user, logOutUser }) {
  const [search, setSearch] = useState("");
  console.log("USER", user);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection("users");
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           // setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch((error) => {
  //           // setLoading(false);
  //         });
  //     } else {
  //       // setLoading(false);
  //     }
  //   });
  // }, []);

  const handleSearch = async () => {
    try {
      const query = {
        key: gCloudKey,
        inputtype: "textquery",
        input: search,
      };
      const {
        data,
      } = await axios.get(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        { params: query }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogOutPress = () => {
    logOutUser();
    console.log("User logged out, USER:", user);
    navigation.navigate("Legislative");
  };

  const onFollowingPress = () => {
    navigation.navigate("Following", { user });
  };

  return (
    <View style={styles.container}>
      {/* <Searchbar
        placeholder="Enter location"
        value={search}
        onChangeText={(query) => setSearch(query)}
        onSubmitEditing={handleSearch}
      /> */}
      <View style={styles.billsreps}>
        {/*
      Make swipable from left to right, bills to representatives?
       */}
        {/* <Chip>Bills</Chip>
        <Chip>Representatives</Chip> */}
      </View>

      <ZoomView style={styles.map} maxZoom={2} minZoom={1}>
        <USMap navigation={navigation} />
      </ZoomView>

      {/* <View style={styles.branchbar}>
        <Button icon="gavel" onPress={() => navigation.navigate("Judicial")}>
          Judicial
        </Button>
        <Button
          icon="fountain-pen"
          onPress={() => navigation.navigate("Executive")}
        >
          Executive
        </Button> */}
        {/* <Button icon="book-open-variant">Legislative</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate("Compare")}>
          Go to Compare Members Screen
        </Button>
        <Button onPress={() => navigation.navigate('Single Member', { user })}>
          Go to Single Member Screen
        </Button>
        <Button onPress={() => navigation.navigate("Bills")}>
          Go to Bills
        </Button> */}
      {/* </View>  */}
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

const mapState = (state) => {
  return { user: state };
};

const mapDispatch = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUserThunk()),
  };
};

export default connect(mapState, mapDispatch)(LegislativeHome);
