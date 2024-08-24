import React, { Component } from "react";
import { Button, View, Text } from "react-native";

import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://192.168.116.1:3000');

export default function Details({navigation, route}: any) {
    return (
      <View>
        <Text>Room ID: {route.params.roomId}</Text>
      </View>
    );
  }