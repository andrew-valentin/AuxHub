import React, { Component, useState } from "react";
import { Button, View, FlatList, Text, StyleSheet, TextInput } from "react-native";

import SocketIOClient from 'socket.io-client';

const songs = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

//const socket = SocketIOClient('44.225.181.72:4000');

export default function Details({navigation, route}: any) {
  const [songLink, onChangeSongLink] = useState('Song Link');
  const [songList, setSongList] = useState(songs);

  const handleAddSong = () => {
    console.log(`adding ${songLink} to queue with id ${Date.now().toString()}`);
    
    setSongList([...songList, {id: Date.now().toString(), title: songLink}]);
  }

  // socket stuff
  //socket.on('connect', () => {
  //  console.log('Connected to room');
  //});

  return (
    <View>
      <Text>Room ID: {route.params.roomId}</Text>

      <Text>Song Queue</Text>
      <FlatList
        data={songList}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

      <TextInput
          style={styles.input}
          onChangeText={onChangeSongLink}
          value={songLink}
      />
      <Button
          title="Add Song To Queue"
          onPress={handleAddSong}
      />
    </View>
  );
};

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
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});