import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import mainStyle from '../../assets/styles/mainStyle';
import settingStyle from '../../assets/styles/settingStyle';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const Notes = () => {
  const openAddWin = () => {};

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={'light-content'}
        style="light"
      />
      <FlatList
        data={noteData}
        style={{ padding: 3 }}
        renderItem={({ item }) => <NoteItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: '10%', right: '10%', padding: 10 }}
        onPress={openAddWin}
      >
        <Ionicons name="ios-add-circle-outline" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const NoteItem = ({ item }) => {
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
];

export default Notes;
