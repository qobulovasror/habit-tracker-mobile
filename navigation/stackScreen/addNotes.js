import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import mainStyle from '../../assets/styles/mainStyle';
import { StatusBar } from 'expo-status-bar';
import { addStyle } from '../../assets/styles/addStyle';
import { Ionicons } from '@expo/vector-icons';
import { addNote, updateNote } from '../../services/noteDB';

const AddNote = ({ navigation, fetchNotes, targetNote, setTargetNote }) => {
  const [note, setNote] = useState({ title: '', body: '' });

  const goBack = () => {
    navigation.navigate('main');
  };

  const submitHabit = () => {
    // chack datas
    if (note.title.length < 3)
      return alert('Title must be at least 3 characters long');
    if (note.body.length < 3)
      return alert('Body must be at least 3 characters long');

    if (!!targetNote) {
      updateNote(targetNote.id, note.title, note.body);
      setTargetNote(null)
    } else {
      addNote(note.title, note.body);
    }
    fetchNotes();
    goBack();
    setNote({ title: '', body: '' });
  };

  useEffect(() => {
    if (!!targetNote) {
      setNote(targetNote);
    }
  }, []);

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={'light-content'}
        style="light"
      />
      <TouchableOpacity
        style={[mainStyle.goBack, { zIndex: 5 }]}
        onPress={goBack}
      >
        <Ionicons name="arrow-back-sharp" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={[mainStyle.header, { marginBottom: 7, marginTop: -30 }]}>
        {(targetNote!=null) ? 'View and Edit note ' : 'Add new note'}
      </Text>

      <ScrollView style={{ paddingHorizontal: 10, marginTop: 5 }}>
        {/* name */}
        <View style={addStyle.singleGroup}>
          <Text style={addStyle.inputTitle}>Title: </Text>
          <TextInput
            style={addStyle.singleInput}
            value={note.title}
            onChangeText={(val) => setNote({ ...note, title: val })}
            placeholder="Read book..."
            placeholderTextColor="#999"
          />
        </View>
        <View style={addStyle.singleGroup}>
          <Text style={addStyle.inputTitle}>Body: </Text>
          <TextInput
            style={addStyle.singleInput}
            value={note.body}
            multiline={true}
            onChangeText={(val) => setNote({ ...note, body: val })}
            placeholder="Read book..."
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          onPress={submitHabit}
          style={{
            backgroundColor: '#00f',
            width: '100%',
            marginVertical: 5,
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 22 }}>
            Saqlash
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNote;
