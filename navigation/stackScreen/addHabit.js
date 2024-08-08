import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { addStyle } from "../../assets/styles/addStyle";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {colors, randomColor} from '../../assets/config/colors'
import { addHabit } from "../../services/habitDB";

const AddHabit = ({fetchHabits, navigation}) => {
  const [habit, setHabit] = useState({
    name: "",
    frequency: 7,
    amount: 1,
    amountType: "",
    change: 0,
    reminder: {
      time: new Date(),
      active: false,
    },
    color: randomColor()
  });

  const goBack = () => {
    navigation.navigate('main')
  }

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [amountDetalisShow, setAmountDetalisShow] = useState(false);
 
  const setFreq = (val) =>{
    if(val>-1 && val<8)
      setHabit({...habit, frequency: val})
  }

  const setAmount = (val) =>{
    if(val>0)
    setHabit({...habit, amount: val})
  }

  const setChange = (val) =>{
    if(val>-1)
    setHabit({...habit, change: val})
  }

  const changeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    setHabit({...habit, reminder: {...habit.reminder, time: selectedDate} })// selectedDate);
  };

  const changetColor = (color) => {
    setHabit({ ...habit, color: color});
  }

  const submitHabit = () =>{
    //add habit to database here
    
    // chack datas
    if(!habit.name) return alert("Name is required");
    addHabit(
      habit.name,
      habit.frequency,
      habit.amount,
      habit.amountType,
      (habit.reminder.active)? 1: 0,
      habit.reminder.time,
      habit.color
    )

    fetchHabits()
    setHabit({
      name: "",
      frequency: 7,
      amount: 1,
      amountType: "",
      change: 0,
      reminder: {
        time: new Date(),
        active: false,
      },
      description: "",
      color: randomColor()
    });
    setAmountDetalisShow(false)
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <TouchableOpacity style={[mainStyle.goBack, {zIndex: 5}]} onPress={goBack}>
          <Ionicons name="arrow-back-sharp" size={30} color="#fff" />
        </TouchableOpacity>
      <Text style={[mainStyle.header, {marginBottom: 7, marginTop: -30}]}>Add new habit</Text>
        
      <ScrollView style={{ paddingHorizontal: 10, marginTop: 5}}>
        {/* name */}
        <View style={addStyle.catGroup}>
          <Text style={addStyle.inputTitle}>Habit name: </Text>
          <TextInput
            style={addStyle.input}
            value={habit.name}
            onChangeText={(val) => setHabit({ ...habit, name: val })}
            placeholder="Read book"
            placeholderTextColor="#999"
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
        {/* amount */}
        <View style={[addStyle.catGroup, {flexDirection: 'column'}]}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={addStyle.inputTitle}>Amount: </Text>
            <View style={mainStyle.row}>
              <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
                Daily size
              </Text>
              <TouchableOpacity style={[addStyle.btn, {}]} onPress={()=>setAmount(habit.amount-1)}>
                <AntDesign name="minus" size={24} color="#fff" />
              </TouchableOpacity>
              <TextInput
                style={[addStyle.input, { width: 50, textAlign: 'center' }]}
                keyboardType="numeric"
                value={habit.amount.toString()}
                onChangeText={val=>setAmount(val)}
              />
              <TouchableOpacity style={[addStyle.btn, {}]} onPress={()=>setAmount(habit.amount+1)}>
                <AntDesign name="plus" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={[addStyle.btn, {padding: 8, backgroundColor: '#52525EFF', transform: [{ rotate: amountDetalisShow?'180deg': "0deg"}]}]} onPress={()=>setAmountDetalisShow(!amountDetalisShow)}>
                <MaterialIcons name="expand-more" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {
            amountDetalisShow &&
            <View style={[mainStyle.column, {marginTop: 10}]}>
                <View style={[mainStyle.row, mainStyle.between, {marginBottom: 7}]}>
                  <Text style={addStyle.inputTitle}>Size type: </Text>
                  <TextInput 
                    style={[addStyle.input, {width: '60%'}]} 
                    value={habit.amountType}
                    onChangeText={(val)=>setHabit({...habit, amountType: val})}
                    placeholder={`${habit.amount} (page) per day`} 
                    placeholderTextColor="#999"/>
                </View>
            </View>
          }
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
        {/* color */}
        <View style={[addStyle.catGroup,{ flexDirection: "column" }]}>
          <View style={[mainStyle.row, ]}>
            <Text style={addStyle.inputTitle}>Color: </Text>
            <View style={[addStyle.changetColor, {backgroundColor: `#${habit.color}`}]}></View>
          </View>
          <View style={[mainStyle.row, mainStyle.around]}>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[0]}`, borderWidth: (habit.color==colors[0])? 2: 0}]} onPress={()=>changetColor(colors[0])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[1]}`, borderWidth: (habit.color==colors[1])? 2: 0}]} onPress={()=>changetColor(colors[1])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[2]}`, borderWidth: (habit.color==colors[2])? 2: 0}]} onPress={()=>changetColor(colors[2])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[3]}`, borderWidth: (habit.color==colors[3])? 2: 0}]} onPress={()=>changetColor(colors[3])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[4]}`, borderWidth: (habit.color==colors[4])? 2: 0}]} onPress={()=>changetColor(colors[4])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[5]}`, borderWidth: (habit.color==colors[5])? 2: 0}]} onPress={()=>changetColor(colors[5])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[6]}`, borderWidth: (habit.color==colors[6])? 2: 0}]} onPress={()=>changetColor(colors[6])}></TouchableOpacity>
            <TouchableOpacity style={[addStyle.changetColor, {backgroundColor: `#${colors[7]}`, borderWidth: (habit.color==colors[7])? 2: 0}]} onPress={()=>changetColor(colors[7])}></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={submitHabit} style={{backgroundColor: "#00f", width: '100%', marginVertical: 5, borderRadius: 10, padding: 15}}>
          <Text style={{color: "#fff", textAlign: 'center', fontSize: 22}}>Saqlash</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



export default AddHabit;
