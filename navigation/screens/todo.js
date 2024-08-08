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

const TodoList = ({navigation}) => {
  const openAddWin = () => {
    navigation.navigate("addTodo");
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
        style={{ paddingBottom: 80 }}
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
    <View style={{margin: 10, padding: 13, backgroundColor: '#36363FFF', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'  }}>
      <Text style={{fontSize: 20, color: '#fff'}}>{ ((item.status==1) && "✅  ")+ item.name}</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 0, marginEnd: 15}}>
          <MaterialIcons name="delete-outline" size={28} color="#f00" />
        </TouchableOpacity>
        <Checkbox 
          style={{margin: 5}}
          value={item.status==1}
          onChange={()=>{}}
        />
      </View>
    </View>
  )
}

const todoData = [
  {
    id: 1,
    name: "O'qish",
    status: true
  },
  {
    id: 2,
    name: "Dars",
    status: false
  },
  {
    id: 3,
    name: "O'qish",
    status: 0
  },
  {
    id: 4,
    name: "O'qish 3",
    status: 0
  },
  {
    id: 42,
    name: "O'qish 3",
    status: 0
  },
  {
    id: 43,
    name: "O'qish 3",
    status: 0
  },
]


export default TodoList;



//I will edit add btn  