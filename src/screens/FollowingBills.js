import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text, Avatar, List, Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import axios from "axios";
import { config } from "../../secrets";
import { useIsFocused } from "@react-navigation/native";

function FollowingBills({ navigation, user }) {

  // const [following, setFollowing] = useState(null);
  // const isFocused = useIsFocused();


  // useEffect(() => {
  //   let getData = async (memberId) => {
  //     const { data } = await axios.get(
  //       `https://api.propublica.org/congress/v1/members/${memberId}.json`,
  //       config
  //     );
  //     const { id, first_name, last_name, current_party, roles } = await data.results[0]
  //     const { short_title, title, state } = roles[0]
  //     const fullname = short_title + " " + first_name + " " + last_name
  //     const desc = state + " " + "(" + current_party + ")"
  //     return { id, fullname, current_party, title, state, desc }
  //   }
  //   Promise.all(user.members.map(memberId => getData(memberId)))
  //     .then(followingData => {
  //       setFollowing(followingData)
  //     })
  // }, [isFocused]);

  // const handlePageChange = async (id) => {
  //   const { data } = await axios.get(
  //     `https://api.propublica.org/congress/v1/members/${id}.json`,
  //     config
  //   );
  //   navigation.navigate("Single Member", { selectedRep: data.results[0] });
  // };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {user.bills &&
          user.bills.map((billNum) => (
            <List.Item
            key={billNum}
            title="Testing"
            description="TESTING"
            // onPress={() => handlePageChange(memberObj.id)}
            // left={(props) => (
            //   <Avatar.Image
            //     {...props}
            //     size={70}
            //     source={{
            //       uri:
            //         `https://theunitedstates.io/images/congress/225x275/${memberObj.id}.jpg`,
            //     }}
            //   />
            // )}
           />
          ))
        }
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState)(FollowingBills);
