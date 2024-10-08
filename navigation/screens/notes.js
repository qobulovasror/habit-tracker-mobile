import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import mainStyle from '../../assets/styles/mainStyle';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {deleteNote} from "../../services/noteDB"

const Notes = ({ navigation, notes, fetchNotes, setTargetNote }) => {
  const openAddWin = () => {
    setTargetNote(null);
    navigation.navigate('addNote');
  };

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={'light-content'}
        style="light"
      />
      <FlatList
        data={notes}
        style={{ padding: 2 }}
        renderItem={({ item }) => <TodoItem 
          item={item} 
          fetchNotes={fetchNotes} 
          setTargetNote={setTargetNote}
          navigation={navigation}
        />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const TodoItem = ({ item, fetchNotes, setTargetNote, navigation }) => {
  const deleteItem = (id) => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to delete this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteNote(id);
            fetchNotes();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openTargetNote = (item) => {
    setTargetNote(item)
    navigation.navigate('addNote');
  }
  return (
    <View
      style={{
        margin: 10,
        padding: 13,
        backgroundColor: '#36363FFF',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>{(item.title.length>35)? item.title.slice(0, 33)+"...": item.title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity style={{ padding: 0, marginEnd: 15 }} onPress={()=>deleteItem(item.id)}>
            <MaterialIcons name="delete-outline" size={28} color="#f00" />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 0, marginStart: 15 }} onPress={()=>openTargetNote(item)}>
            <Ionicons name="open-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ color: '#9C9C9DFF', marginVertical: 5 }}>
        {item.body.length > 203 ? item.body.slice(0, 200) + '...' : item.body}
      </Text>
    </View>
  );
};

export default Notes;

//I will edit add btn
