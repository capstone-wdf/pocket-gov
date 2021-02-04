import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native';

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
    }
})

export default function HomeScreen(props) {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}
