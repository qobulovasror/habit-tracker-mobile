import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import homeStyle from "../../assets/styles/homeStyle";
import { SelectList } from "react-native-dropdown-select-list";
import mainStyle from "../../assets/styles/mainStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Home(props) {
  const {navigation, habits} = props;

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
      />
      {/* <Text style={mainStyle.header}>Habits</Text> */}
      {/* sort habit */}
      {/* <SelectList 
        setSelected={(val) => {}} 
        data={[{ key: "2", value: "Appliances" }]} 
        save="value"
      /> */}
      <FlatList
        data={habits}
        style={{ padding: 5 }}
        renderItem={({ item }) => <Item item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      />

    </SafeAreaView>
  );
}

const Item = ({item, navigation}) => {
  return (
    <TouchableOpacity style={homeStyle.listItem} onPress={() => navigation.navigate('viewHabit')}>
      <View style={[mainStyle.between, mainStyle.row]}>
        <Text style={homeStyle.itemTitle}>{(String(item.name).length>20)? item.name.slice(0, 20)+"...": item.name}</Text>
        <View style={mainStyle.row}>
          <Text style={homeStyle.itemTimes}>4 time in a week</Text>
          <TouchableOpacity disabled>
            <MaterialCommunityIcons
              name={item.reminderActive==1 ? "bell-outline" : "bell-off-outline"}
              size={27}
              color={item.reminderActive==1? "#000dfd": "#838996FF"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[mainStyle.between, mainStyle.row]}>
        {
          week.map((day, index)=>(
            <View style={[mainStyle.column, {marginTop: 5}]} key={index}>
              <Text style={homeStyle.weekTitle}>{day.day}</Text>
              <View style={[homeStyle.weekNum, {backgroundColor: "#00f"}]}>
                <Text style={{textAlign: "center", color: "#fff"}}>{day.num}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </TouchableOpacity>
  );
};


const randomColor = () =>{
  const colors=["#ffc801","#000dfd", "#dcf000", "#4ffb00", "#b301ff","#00bfff", "#ff00aa"];
  return colors[Math.round(Math.random()*colors.length-1)]
}

const DATA = [
  {
    "amount": 2, 
    "amountType": "sdfsdf", 
    "change": 1, 
    "color": "08A34FFF", 
    "createdAt": "2024-01-02 11:12:01", 
    "description": "sdfsdf", 
    "frequency": 7, 
    "id": 1, 
    "name": "ghgsfdf", 
    "reminderActive": 0, 
    "reminderTime": ""
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Read book",
    reminder: false,
    activites: week,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Read book",
    reminder: true,
    activites: week,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Read book",
    reminder: false,
    activites: week,
  },
];

const week = [
  {day:"Mon", num: 20, status:"none"},
  {day:"Tue", num: 21},
  {day:"Wed", num: 22},
  {day:"Thu", num: 23},
  {day:"Fri", num: 24},
  {day:"Sat", num: 25},
  {day:"Sun", num: 26},
]
