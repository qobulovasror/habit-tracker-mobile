import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import checkHabitStyle from "../../assets/styles/checkHabitStyle";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import mainStyle from "../../assets/styles/mainStyle";

const CheckHabit = ({ navigation }) => {
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar backgroundColor="#272730" barStyle={"light-content"} />
      {/* <Text style={mainStyle.header}>Today's habits</Text> */}
      <FlatList
        data={DATA}
        style={{ padding: 5 }}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default CheckHabit;

const Item = ({ item, navigation }) => {
  return (
    <View
      style={checkHabitStyle.listItem}
    >
      <View style={[mainStyle.between, mainStyle.row]}>
        <Text style={[checkHabitStyle.itemTitle, {fontSize: 25, marginTop: 5}]}>
          {item.name.length > 20
            ? item.name.slice(0, 20) + "..."
            : item.name}
        </Text>
        <View style={mainStyle.row}>
          <TouchableOpacity style={{padding: 8, backgroundColor: "#00f", borderRadius: 10}}>
            <MaterialIcons name="check" size={27} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 8, backgroundColor: "#52525EFF", borderRadius: 10, marginStart: 10}}>
            <MaterialIcons name="expand-more" size={27} color="#fff" />
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
