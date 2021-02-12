import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, View,  } from 'react-native';
import {
  Button,
  Menu,
  Searchbar,
  Text,
  Title,
  Subheading,
  Paragraph,
  Dialog,
  Portal
} from 'react-native-paper';
import axios from 'axios';
import { config } from '../../secrets';
import { connect } from "react-redux";
import { updateUserBillFollowingThunk, unfollowBillThunk } from "../../redux/app-redux";


async function getSpecificBill(congress, bill_slug) {
  const theUrl = `https://api.propublica.org/congress/v1/${congress}/bills/${bill_slug}.json`;
  try {
    const { data } = await axios.get(theUrl, config);
    let result = await data.results[0];
    return result;
  } catch (error) {
    console.error(error);
  }
}

function SpecificBill({ route, navigation, user, updateUserBill, unfollowBill }) {
  const [bill, setBill] = useState(null);
  const { bill_slug } = route.params;
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const congress = '117';

  const callGetSpecificBill = async () => {
    let specificBill = await getSpecificBill(congress, bill_slug);
    setBill(specificBill);
  };

  useEffect(() => {
    if (!bill) {
      callGetSpecificBill();
    }
  }, [bill]);

  const onFollowPress = async () => {
    try {
      await updateUserBill(user.id, bill_slug);
      console.log("user state after update u:", user, user.bills);
      // navigation.navigate('singelMember')
    } catch (error) {
      console.log("Follow Error", error);
    }
  };

  const onUnfollowPress = async () => {
    try {
      await unfollowBill(user.id, bill_slug);
    } catch (error) {
      console.log("Unfollow Error", error);
    }
  };

  const onRedirectToLogin = async () => {
    try {
      setVisible(false);
      navigation.navigate('Login')
    } catch (error) {
      console.log("Redirect Error", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {bill && (
        <View>
          <Title>{`${bill.number}`}</Title>
          <Subheading>{bill.title}</Subheading>
          <Text>{`Sponsored by ${bill.sponsor_title} ${bill.sponsor} (${bill.sponsor_party}) ${bill.sponsor_state} and ${bill.cosponsors} cosponsor(s)`}</Text>
          <Text>{`Committees: ${bill.committees}`}</Text>
          <Text>{`The latest major action on this bill: ${bill.latest_major_action}`}</Text>
          <Text>{`The latest major action date: ${bill.latest_major_action_date}`}</Text>
          {bill.active ? (
            <Text>Bill status: active</Text>
          ) : (
            <Text>Bill status: inactive</Text>
          )}
          {bill.house_passage && (
            <Text>{`Passed in the House on ${bill.house_passage}`}</Text>
          )}
          {bill.senate && (
            <Text>{`Passed in the Senate on ${bill.senate}`}</Text>
          )}
          {bill.enacted && <Text>{`Enacted on ${bill.enacted}`}</Text>}
          {bill.vetoed && <Text>{`Vetoed on ${bill.vetoed}`}</Text>}
          {bill && user.id ? (
            <View>
              {user.bills.includes(bill_slug) ? (
                <Button onPress={() => onUnfollowPress()}>Following</Button>
              ) : (
                <Button onPress={() => onFollowPress()}>Follow</Button>
              )}
            </View>
          ) : (
            <View>
              <Button onPress={showDialog}>Follow</Button>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Hi there 👋 </Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>Please login to follow members and bills.</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Close</Button>
                    <Button onPress={() => onRedirectToLogin()}>Login</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});

const mapState = (state) => {
  return {
    user: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateUserBill: (userId, billNum) =>
      dispatch(updateUserBillFollowingThunk(userId, billNum)),
    unfollowBill: (userId, billSlug) =>
      dispatch(unfollowBillThunk(userId, billSlug))
  };
};

export default connect(mapState, mapDispatch)(SpecificBill);
