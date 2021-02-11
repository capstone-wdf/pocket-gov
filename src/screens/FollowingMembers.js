import React from "react";
import { TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

function FollowingMembers({ navigation, user }) {

  console.log("State user:", user);
  
  // const handlePageChange = (chamber, id) => {
  //     const selectedRep = chamber.filter((reps) => reps.id === id)[0];
  //     console.log(selectedRep);
  //     navigation.navigate("Single Member", { selectedRep });
  //   };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text>Following</Text>
        {user.members &&
          user.members.map((memberId) => (
            <TouchableWithoutFeedback
              key={memberId}
              //   onPress={() => handlePageChange("117", memberId)}
            >
              <Avatar.Image
                size={70}
                source={{
                  uri: `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`,
                }}
              />
            </TouchableWithoutFeedback>
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

export default connect(mapState)(FollowingMembers);
