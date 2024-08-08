import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import mainStyle from "../../assets/styles/mainStyle";

const Notes = () => {
  const openAddWin = () => {};
  return (
    <SafeAreaView style={mainStyle.container}>
      {/* <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      /> */}
      {/* <FlatList
        data={[]}
        style={{ padding: 3 }}
        renderItem={({item}) => (
          <></> 
        )}
        keyExtractor={(item) => item.id}
      /> */}
      <TouchableOpacity style={{position: 'absolute'}} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={"#fff"} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  )
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <FlatList
        data={noteData}
        style={{ padding: 3, borderWidth: 1, marginBottom: 0 }}
        renderItem={({item}) => (
          <NoteItem item={item}/>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={[mainStyle.addBtn, {top: 0}]} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={"#fff"} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const NoteItem = ({ item }) => {
  return (<></>)
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        padding: 13,
        backgroundColor: '#36363FFF',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity style={{ padding: 0, marginEnd: 15 }}>
          <MaterialIcons name="delete-outline" size={28} color="#f00" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 0, marginStart: 15 }}>
          <Ionicons name="open-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const noteData = [
  {
    id: 1,
    name: "O'qish",
  },
  {
    id: 2,
    name: 'Dars',
    status: false,
  },
  {
    id: 3,
    name: "O'qish",
    status: 0,
  },
  {
    id: 4,
    name: "O'qish 3",
    status: 0,
  },
  {
    id: 5,
    name: "O'qish",
    status: 0,
  },
  {
    id: 6,
    name: "O'qish 3",
    status: 0,
  },
  {
    id: 7,
    name: "O'qish",
    status: 0,
  },
  {
    id: 445,
    name: "O'qish 3",
    status: 0,
  },
  {
    id: 33,
    name: "O'qish",
    status: 0,
  },
  {
    id: 42,
    name: "O'qish 3",
    status: 0,
  },
  {
    id: 323,
    name: "O'qish",
    status: 0,
  },
  {
    id: 4423,
    name: "O'qish 31",
    status: 0,
  },
];

export default Notes;
