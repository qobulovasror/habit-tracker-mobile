import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const Notes = ({navigation}) => {
  const openAddWin = () => {
    navigation.navigate("addNote");
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <FlatList
        data={todoData}
        style={{ padding: 2 }}
        renderItem={({item}) => (
          <TodoItem item={item}/>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={"#fff"} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const TodoItem = ({item}) => {
  return(
    <View style={{margin: 10, padding: 13, backgroundColor: '#36363FFF', borderRadius: 10}}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity style={{padding: 0, marginEnd: 15}}>
            <MaterialIcons name="delete-outline" size={28} color="#f00" />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 0, marginStart: 15 }}>
            <Ionicons name="open-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{color: '#9C9C9DFF', marginVertical: 5}}>{(item.body.length>203)? item.body.slice(0, 200)+"...": item.body}</Text>
    </View>
  )
}

const todoData = [
  {
    id: 1,
    name: "O'qish",
    body: "sasfdfs sdfsdsc sxas"
  },
  {
    id: 2,
    name: "Dars",
    body: "sasfdfs sdfsdsc sxas"
  },
  {
    id: 3,
    name: "O'qish",
    body: "sasfdfs sdfsdsc s"
  },
  {
    id: 4,
    name: "O'qish 3",
    body: "sasfdfs sdfsdsc sxas"
  },
  {
    id: 42,
    name: "O'qish 3",
    body: "sasfdfs sdfsdsc sxas"
  },
  {
    id: 43,
    name: "O'qish 3",
    body: "sasfdfs sdfsdsc sxas"
  },
]


export default Notes;



//I will edit add btn  