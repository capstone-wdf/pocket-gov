import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text, Avatar, List, Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import axios from "axios";
import { config } from "../../secrets";

function FollowingScreen({ navigation, user }) {
  // console.log("Route Param:", route.params.user.members)
  const [followingdata, setFollowingData] = useState([]);

  // console.log("State user:", user);

  // useEffect(() => {
  //   const followingData = []
  //   user.members.forEach(async (memberId) => {
  //     const { data } = await axios.get(
  //       `https://api.propublica.org/congress/v1/members/${memberId}.json`,
  //       config
  //     );
  //     const memberData = await data.results[0]
  //     followingData.push(memberData)
  //   })

  //   setFollowingData(followingData)
  //   // console.log("FD:", followingData)
  // }, []);

  const handlePageChange = async (id) => {
    const { data } = await axios.get(
      `https://api.propublica.org/congress/v1/members/${id}.json`,
      config
    );
    navigation.navigate("Single Member", { selectedRep: data.results[0] });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {user.members &&
          user.members.map((memberId) => (
            <List.Item
            key={memberId}
            title="Kamala Harris"
            description="Vice President"
            onPress={() => handlePageChange(memberId)}
            left={(props) => (
              <Avatar.Image
                {...props}
                size={70}
                source={{
                  uri:
                    `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`,
                }}
              />
            )}
           />
          //   <TouchableWithoutFeedback
          //     key={memberId}
          //     onPress={() => handlePageChange(memberId)}
          //   >
          //     <Avatar.Image
          //       size={70}
          //       source={{
          //         uri: `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`,
          //       }}
          //     />
          //   </TouchableWithoutFeedback>
          ))}
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

export default connect(mapState)(FollowingScreen);
