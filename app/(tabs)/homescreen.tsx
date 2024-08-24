import React from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://192.168.116.1:3000');

export default function HomeScreen({ navigation }: any) {
    const [roomId, onChangeRoomId] = React.useState('Room ID');

    // socket stuff
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    const createRoom = async () => {
        console.log('sending request to server')

        // create room
        const ack = await socket.emitWithAck('createRoom');

        navigation.navigate('Details', { roomId: ack[1] });
    }

    const joinRoom = async (room: String) => {
        console.log('sending request to server');

        // join room
        const ack = await socket.emitWithAck('joinRoom', room);

        if (ack[0]) navigation.navigate('Details', { roomId: ack[1] });

        onChangeRoomId('enter valid id');
    }

    const handleCreateRoom = () => createRoom();
    const handleJoinRoom = () => joinRoom(roomId);


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
                onPress={handleJoinRoom}
            />
            <Text>Don't have a room ID?</Text>
            <Button
                title="Create Room"
                onPress={handleCreateRoom}
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