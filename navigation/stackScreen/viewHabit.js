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
import { viewHabitStyle } from "../../assets/styles/viewHabitStyle";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, randomColor } from "../../assets/config/colors";
import { updateHabit, deleteHabit } from "../../services/habitDB";

const ViewHabit = (props) => {
  const {navigation, fetchHabits, selectHabit, setSelectHabit} = props
  if(!selectHabit) {
    navigation.navigate('main')
    setSelectHabit()
  }

  const [habit, setHabit] = useState({
    name: selectHabit.name,
    frequency: selectHabit.frequency,
    amount: selectHabit.amount,
    amountType: selectHabit.amountType,
    change: selectHabit.change,
    reminder: {
      time: (selectHabit.reminderTime)? new Date(selectHabit.reminderTime): new Date(),
      active: (selectHabit.reminderActive==1)? true: false,
    },
    description: selectHabit.description,
    color: selectHabit.color,
  });

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [amountDetalisShow, setAmountDetalisShow] = useState(false);

  const setFreq = (val) => {
    if (val > -1 && val < 8) setHabit({ ...habit, frequency: val });
  };

  const setAmount = (val) => {
    if (val > 0) setHabit({ ...habit, amount: val });
  };

  const setChange = (val) => {
    if (val > -1) setHabit({ ...habit, change: val });
  };

  const changeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    setHabit({ ...habit, reminder: { ...habit.reminder, time: selectedDate } }); // selectedDate);
  };

  const changetColor = (color) => {
    setHabit({ ...habit, color: color });
  };

  const submitHabit = () => {
    if (!habit.name) return alert("Name is required");
    // addHabit(
    //   habit.name,
    //   habit.frequency,
    //   habit.amount,
    //   habit.amountType,
    //   habit.change,
    //   (habit.reminder.active)? 1: 0,
    //   habit.reminder.time,
    //   habit.description,
    //   habit.color
    // )
    fetchHabits();
  };

  const deleteHabitHandler = () => {
    deleteHabit(selectHabit.id).then(data=>{
      console.log(data);
    })
    goBack()
  }
  const goBack = () => {
    fetchHabits()
    setSelectHabit(false)
    navigation.navigate('main')
  }
  return (
    <SafeAreaView style={[mainStyle.container]}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={[mainStyle.row, mainStyle.between]}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#00f",
              borderRadius: 10,
              margin: 5,
            }}
            onPress={goBack}
          >
            <AntDesign name="arrowleft" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={[mainStyle.header, { marginBottom: 10 }]}>
            Add new habit
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#f00",
              borderRadius: 10,
              margin: 5,
            }}
            onPress={deleteHabitHandler}
          >
            <MaterialIcons name="delete-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* name */}
        <View style={viewHabitStyle.catGroup}>
          <Text style={viewHabitStyle.inputTitle}>Habit name: </Text>
          <TextInput
            style={viewHabitStyle.input}
            value={habit.name}
            onChangeText={(val) => setHabit({ ...habit, name: val })}
            placeholder="Read book"
            placeholderTextColor="#999"
          />
        </View>
        {/* frequency */}
        <View style={viewHabitStyle.catGroup}>
          <Text style={viewHabitStyle.inputTitle}>Frequency: </Text>
          <View style={mainStyle.row}>
            <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
              Times a week
            </Text>
            <TouchableOpacity
              style={[viewHabitStyle.btn, {}]}
              onPress={() => setFreq(habit.frequency - 1)}
            >
              <AntDesign name="minus" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={[viewHabitStyle.input, { width: 50, textAlign: "center" }]}
              keyboardType="numeric"
              value={habit.frequency?.toString()}
              onChangeText={(val) => setFreq(val)}
            />
            <TouchableOpacity
              style={[viewHabitStyle.btn, {}]}
              onPress={() => setFreq(habit.frequency + 1)}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* amount */}
        <View style={[viewHabitStyle.catGroup, { flexDirection: "column" }]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={viewHabitStyle.inputTitle}>Amount: </Text>
            <View style={mainStyle.row}>
              <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
                Daily size
              </Text>
              <TouchableOpacity
                style={[viewHabitStyle.btn, {}]}
                onPress={() => setAmount(habit.amount - 1)}
              >
                <AntDesign name="minus" size={24} color="#fff" />
              </TouchableOpacity>
              <TextInput
                style={[
                  viewHabitStyle.input,
                  { width: 50, textAlign: "center" },
                ]}
                keyboardType="numeric"
                value={habit.amount?.toString()}
                onChangeText={(val) => setAmount(val)}
              />
              <TouchableOpacity
                style={[viewHabitStyle.btn, {}]}
                onPress={() => setAmount(habit.amount + 1)}
              >
                <AntDesign name="plus" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  viewHabitStyle.btn,
                  {
                    padding: 8,
                    backgroundColor: "#52525EFF",
                    transform: [
                      { rotate: amountDetalisShow ? "180deg" : "0deg" },
                    ],
                  },
                ]}
                onPress={() => setAmountDetalisShow(!amountDetalisShow)}
              >
                <MaterialIcons name="expand-more" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {amountDetalisShow && (
            <View style={[mainStyle.column, { marginTop: 10 }]}>
              <View
                style={[mainStyle.row, mainStyle.between, { marginBottom: 7 }]}
              >
                <Text style={viewHabitStyle.inputTitle}>Size type: </Text>
                <TextInput
                  style={[viewHabitStyle.input, { width: "60%" }]}
                  value={habit.amountType}
                  onChangeText={(val) =>
                    setHabit({ ...habit, amountType: val })
                  }
                  placeholder={`${habit.amount} (page) per day`}
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[mainStyle.row, mainStyle.between]}>
                <Text style={viewHabitStyle.inputTitle}>Daily change: </Text>
                <View style={[mainStyle.row]}>
                  <TouchableOpacity
                    style={[viewHabitStyle.btn, {}]}
                    onPress={() => setChange(habit.change - 1)}
                  >
                    <Ionicons name="trending-down" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      viewHabitStyle.input,
                      { width: 50, textAlign: "center" },
                    ]}
                    keyboardType="numeric"
                    value={habit.change?.toString()}
                    onChangeText={(val) => setChange(val)}
                  />
                  <TouchableOpacity
                    style={[viewHabitStyle.btn, {}]}
                    onPress={() => setChange(habit.change + 1)}
                  >
                    <Ionicons name="trending-up" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* remender */}
        <View style={viewHabitStyle.catGroup}>
          <Text style={viewHabitStyle.inputTitle}>Reminder: </Text>
          <TouchableOpacity
            style={[viewHabitStyle.btn, { backgroundColor: "#3D3D46FF" }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>
              {habit.reminder.time.getHours() +
                ":" +
                habit.reminder.time.getMinutes()}
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
        <View style={[viewHabitStyle.catGroup, { flexDirection: "column" }]}>
          <Text style={viewHabitStyle.inputTitle}>Description: </Text>
          <TextInput
            style={[
              viewHabitStyle.input,
              { width: "100%", margin: 5, padding: 10 },
            ]}
            multiline={true}
            value={habit.description}
            onChangeText={(val) => setHabit({ ...habit, description: val })}
            placeholder="The habit of reading books"
            placeholderTextColor="#999"
          />
        </View>
        {/* color */}
        <View style={[viewHabitStyle.catGroup, { flexDirection: "column" }]}>
          <View style={[mainStyle.row]}>
            <Text style={viewHabitStyle.inputTitle}>Color: </Text>
            <View
              style={[
                viewHabitStyle.changetColor,
                { backgroundColor: `#${habit.color}` },
              ]}
            ></View>
          </View>
          <View style={[mainStyle.row, mainStyle.around]}>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[0]}`,
                  borderWidth: habit.color == colors[0] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[0])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[1]}`,
                  borderWidth: habit.color == colors[1] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[1])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[2]}`,
                  borderWidth: habit.color == colors[2] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[2])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[3]}`,
                  borderWidth: habit.color == colors[3] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[3])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[4]}`,
                  borderWidth: habit.color == colors[4] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[4])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[5]}`,
                  borderWidth: habit.color == colors[5] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[5])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[6]}`,
                  borderWidth: habit.color == colors[6] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[6])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[7]}`,
                  borderWidth: habit.color == colors[7] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[7])}
            ></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={submitHabit}
          style={{
            backgroundColor: "#00f",
            width: "100%",
            marginVertical: 5,
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 22 }}>
            Qayta saqlash
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewHabit;
