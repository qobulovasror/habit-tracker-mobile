
import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import checkHabitStyle from "../../assets/styles/checkHabitStyle";
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import mainStyle from "../../assets/styles/mainStyle";


export default function Home(props) {
  const {navigation, habits} = props;
  const openAddWin = () => {
    navigation.navigate('addHabit');
  }
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar backgroundColor="#272730" barStyle={"light-content"} />
      <FlatList
        data={DATA}
        style={{ padding: 5 }}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={"#fff"} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
   
  );
}

const Item = ({ item, navigation }) => {
  return (
    <View
      style={checkHabitStyle.listItem}
    >
      <View style={[mainStyle.between, mainStyle.row]}>
        <View>
          <Text style={[checkHabitStyle.itemTitle, {fontSize: 23, marginTop: -5}]}>
            {item.name.length > 20
              ? item.name.slice(0, 20) + "..."
              : item.name}
          </Text>
          <View style={[mainStyle.row]}>
            <Text style={{color: '#d5d4d4', fontSize: 16, }}>Amount: </Text>
            <Text style={{color: '#d5d4d4', fontSize: 16, }}>{item.amount}  </Text>
            <Text style={{color: '#d5d4d4', fontSize: 16, }}>{item.amountType}</Text>
          </View>
        </View>
        <View style={mainStyle.row}>
          <TouchableOpacity style={{marginEnd: 10, padding: 8, height: 40, backgroundColor: "#555555", borderRadius: 8}}>
            <Feather name="edit-2" size={23} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 8, height: 40, backgroundColor: "#00f", borderRadius: 8}}>
            <MaterialIcons name="check" size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "read book",
    amount: 5,
    amountType: "page",
    color: "#00f",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "read book",
    amount: 5,
    amountType: "page",
    color: "#f00",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "read book",
    amount: 5,
    amountType: "page",
    color: "#0ff",
  },
];
