import React from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";

export default function HomeScreen({ navigation }) {
    const [roomId, onChangeRoomId] = React.useState('Room ID');
    console.log(navigation);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Enter existing room ID:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeRoomId}
                value={roomId}
            />
            <Button
                title="Join Room"
                onPress={() => navigation.navigate('Details')}
            />
            <Text>Don't have a room ID?</Text>
            <Button
                title="Create Room"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});