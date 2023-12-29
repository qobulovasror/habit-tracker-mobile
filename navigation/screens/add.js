import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { addStyle } from "../../assets/styles/addStyle";
import { AntDesign } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {colors, randomColor} from '../../assets/config/colors'

const Add = () => {
  const [habit, setHabit] = useState({
    name: "",
    frequency: 1,
    reminder: {
      time: new Date(),
      active: false,
    },
    description: "",
    color: randomColor()
  });

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
 
  const setFreq = (val) =>{
    if(val>-1 && val<8)
      setHabit({...habit, frequency: val})
  }
  const changeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    setHabit({...habit, reminder: {...habit.reminder, time: selectedDate} })// selectedDate);
  };

  const changetColor = (color) => {
    setHabit({ ...habit, color: color});
    console.log(color);
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={mainStyle.header}>Add new habit</Text>
        {/* name */}
        <View style={addStyle.catGroup}>
          <Text style={addStyle.inputTitle}>Habit name: </Text>
          <TextInput
            style={addStyle.input}
            value={habit.name}
            onChangeText={(val) => setHabit({ ...habit, name: val })}
          />
        </View>
        {/* frequency */}
        <View style={addStyle.catGroup}>
          <Text style={addStyle.inputTitle}>Frequency: </Text>
          <View style={mainStyle.row}>
            <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
              Times a week
            </Text>
            <TouchableOpacity style={[addStyle.btn, {}]} onPress={()=>setFreq(habit.frequency-1)}>
              <AntDesign name="minus" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={[addStyle.input, { width: 50, textAlign: 'center' }]}
              keyboardType="numeric"
              value={habit.frequency.toString()}
              onChangeText={val=>setFreq(val)}
            />
            <TouchableOpacity style={[addStyle.btn, {}]} onPress={()=>setFreq(habit.frequency+1)}>
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* remender */}
        <View style={addStyle.catGroup}>
          <Text style={addStyle.inputTitle}>Reminder: </Text>
          <TouchableOpacity
            style={[addStyle.btn, { backgroundColor: "#3D3D46FF" }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>
              {habit.reminder.time.getHours() + ":" + habit.reminder.time.getMinutes()}
            </Text>
          </TouchableOpacity>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            color="#00f"
          />
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={habit.reminder.time}
              mode={"time"}
              is24Hour={true}
              onChange={changeTime}
              style={{ backgroundColor: "#3D3D46FF" }}
            />
          )}
        </View>
        {/* description */}
        <View style={[addStyle.catGroup, { flexDirection: "column" }]}>
          <Text style={addStyle.inputTitle}>Description: </Text>
          <TextInput
            style={[addStyle.input, { width: "100%", margin: 5, padding: 10 }]}
            multiline={true}
            value={habit.description}
            onChangeText={val=>setHabit({...habit, description: val})}
          />
        </View>
        {/* color */}
        <View style={[addStyle.catGroup,{ flexDirection: "column" }]}>
          <View style={[mainStyle.row, ]}>
            <Text style={addStyle.inputTitle}>Color: </Text>
            <View style={[addStyle.changetColor, {backgroundColor: habit.color}]}></View>
          </View>
          <View style={[mainStyle.row, mainStyle.around]}>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[0], borderWidth: (habit.color==colors[0])? 2: 0}]} onPress={()=>changetColor(colors[0])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[1], borderWidth: (habit.color==colors[1])? 2: 0}]} onPress={()=>changetColor(colors[1])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[2], borderWidth: (habit.color==colors[2])? 2: 0}]} onPress={()=>changetColor(colors[2])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[3], borderWidth: (habit.color==colors[3])? 2: 0}]} onPress={()=>changetColor(colors[3])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[4], borderWidth: (habit.color==colors[4])? 2: 0}]} onPress={()=>changetColor(colors[4])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[5], borderWidth: (habit.color==colors[5])? 2: 0}]} onPress={()=>changetColor(colors[5])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[6], borderWidth: (habit.color==colors[6])? 2: 0}]} onPress={()=>changetColor(colors[6])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: colors[7], borderWidth: (habit.color==colors[7])? 2: 0}]} onPress={()=>changetColor(colors[7])}></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{backgroundColor: "#00f", width: '100%', marginVertical: 10, borderRadius: 10, padding: 15}}>
          <Text style={{color: "#fff", textAlign: 'center', fontSize: 22}}>Saqlash</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default Add;
