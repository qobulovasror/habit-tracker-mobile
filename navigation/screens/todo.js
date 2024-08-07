import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { addStyle } from "../../assets/styles/addStyle";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {colors, randomColor} from '../../assets/config/colors'
import { addHabit } from "../../services/habitDB";
import Checkbox from "expo-checkbox";

const TodoList = ({navigation}) => {
  const openAddWin = () => {
    // navigation.navigate("AddToDo");
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <FlatList
        data={[todoData]}
        style={{ padding: 3 }}
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
      <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
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
  {
    id: 422,
    name: "O'qish 3",
    status: 0
  },
  {
    id: 423422,
    name: "O'qish 3",
    status: 0
  },
  {
    id: 443,
    name: "O'qish 3",
    status: 0
  },
]


export default TodoList;
