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

  const [following, setFollowing] = useState(null);
  const isFocused = useIsFocused();
  const congress = '117'

  useEffect(() => {
    let getData = async (billSlug) => {
      const { data } = await axios.get(
        `https://api.propublica.org/congress/v1/${congress}/bills/${billSlug}.json`, config
      );
      const { bill_slug, bill, short_title } = await data.results[0]
      return { bill_slug, bill, short_title }
    }
    Promise.all(user.bills.map(billSlug => getData(billSlug)))
      .then(followingData => {
        setFollowing(followingData)

      })
  }, [isFocused]);


  const handlePageChange = (id) => {
    navigation.navigate('Specific Bill', { bill_slug: id });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {user.bills && following &&
          following.map((billObj) => (
            <List.Item
            key={billObj.bill_slug}
            title={billObj.bill}
            description={billObj.short_title}
            onPress={() => handlePageChange(billObj.bill_slug)}
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
