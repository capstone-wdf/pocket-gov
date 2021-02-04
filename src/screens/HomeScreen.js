import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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

export default function HomeScreen({navigation}, props) {

    const onLogOutPress = () => {
      firebase
      .auth()
      .signOut()
      .then(
        console.log("Signed Out Successfully", props)
        // need to add to navigate back to sign up page
        )
      .catch(error => {
          alert(error)
    })
    }

    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <Text>Welcome to Pocket Gov</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLogOutPress()}>
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
    )
}
