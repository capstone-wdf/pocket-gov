import React from 'react'
import { TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { Text, Avatar } from "react-native-paper";
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  }
})

export default function HomeScreen({route, navigation}) {
    console.log("Route Param:", route.params.user.members)

    // const handlePageChange = (chamber, id) => {
    //     const selectedRep = chamber.filter((reps) => reps.id === id)[0];
    //     console.log(selectedRep);
    //     navigation.navigate("Single Member", { selectedRep });
    //   };

    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <Text>Following</Text>
          {route.params.user.members.map((memberId) => (
            <TouchableWithoutFeedback
              key={memberId}
            //   onPress={() => handlePageChange("117", memberId)}
            >
                <Avatar.Image
                size={70}
                source={{
                uri: `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`,
                }}/>
            </TouchableWithoutFeedback>
          ))}
      </KeyboardAwareScrollView>
    </View>
    )
}
