import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { viewSelectedHabitStyle } from "../../assets/styles/viewSelectedHabitStyle";
import {
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { deleteHabit } from "../../services/habitDB";
import {deleteTrackersByHabitId} from "../../services/trackerDB"

const ViewHabit = (props) => {
  const {navigation, tracks, viewSelectHabit, setViewSelectHabit, fetchHabits, fetchTrackers} = props
  
  // const [habit, setHabit] = useState({
  //   name: selectHabit.name,
  //   frequency: selectHabit.frequency,
  //   amount: selectHabit.amount,
  //   amountType: selectHabit.amountType,
  //   change: selectHabit.change,
  //   reminder: {
  //     time: (selectHabit.reminderTime)? new Date(selectHabit.reminderTime): new Date(),
  //     active: (selectHabit.reminderActive==1)? true: false,
  //   },
  //   description: selectHabit.description,
  //   color: selectHabit.color,
  // });



  const deleteHabitHandler = () => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to delete this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteHabit(viewSelectHabit.id);
            deleteTrackersByHabitId(viewSelectHabit.id)
            fetchHabits()
            fetchTrackers()
            goBack()
          },
        },
      ],
      { cancelable: true }
    );
    
  }
  const goBack = () => {
    navigation.navigate('main')
    setViewSelectHabit(null)
  }

  return (
    <SafeAreaView style={[mainStyle.container]}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <View style={{ paddingHorizontal: 10 }}>
        {/* header btns */}
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
            Habit details
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
        {/* Habit details */}
        <View style={[viewSelectedHabitStyle.catGroup, {marginTop: 5}]}>
          <View style={[mainStyle.row, mainStyle.between]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>Habit name:  </Text>
            <Text style={viewSelectedHabitStyle.inputTitle}>{viewSelectHabit.name}</Text>
          </View>
          <View style={[mainStyle.row, mainStyle.between]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>frequency:  </Text>
            <Text style={viewSelectedHabitStyle.inputTitle}>{viewSelectHabit.frequency}</Text>
          </View>
          <View style={[mainStyle.row, mainStyle.between]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>amount:  </Text>
            <Text style={viewSelectedHabitStyle.inputTitle}>{viewSelectHabit.amount+" "+viewSelectHabit?.amountType}</Text>
          </View>
          <View style={[mainStyle.row, mainStyle.between]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>change:  </Text>
            <Text style={viewSelectedHabitStyle.inputTitle}>{viewSelectHabit.change}</Text>
          </View>
          <View style={[mainStyle.row, mainStyle.between]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>reminder:  </Text>
            <Text style={viewSelectedHabitStyle.inputTitle}>
              {
                new Date(viewSelectHabit.reminderTime).getHours()+":"+new Date(viewSelectHabit.reminderTime).getMinutes()
              }
              {
                (viewSelectHabit.reminderActive)? "  enable": "  disable"
              }
            </Text>
          </View>
        </View>

        {/* frequency */}
        {/* <View style={viewSelectedHabitStyle.catGroup}>
          <Text style={viewSelectedHabitStyle.inputTitle}>Frequency: </Text>
          <View style={mainStyle.row}>
            <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
              Times a week
            </Text>
            <TouchableOpacity
              style={[viewSelectedHabitStyle.btn, {}]}
              onPress={() => setFreq(habit.frequency - 1)}
            >
              <AntDesign name="minus" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={[viewSelectedHabitStyle.input, { width: 50, textAlign: "center" }]}
              keyboardType="numeric"
              value={habit.frequency?.toString()}
              onChangeText={(val) => setFreq(val)}
            />
            <TouchableOpacity
              style={[viewSelectedHabitStyle.btn, {}]}
              onPress={() => setFreq(habit.frequency + 1)}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* amount */}
        {/* <View style={[viewSelectedHabitStyle.catGroup, { flexDirection: "column" }]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={viewSelectedHabitStyle.inputTitle}>Amount: </Text>
            <View style={mainStyle.row}>
              <Text style={{ color: "#aaa", fontSize: 16, marginTop: 10 }}>
                Daily size
              </Text>
              <TouchableOpacity
                style={[viewSelectedHabitStyle.btn, {}]}
                onPress={() => setAmount(habit.amount - 1)}
              >
                <AntDesign name="minus" size={24} color="#fff" />
              </TouchableOpacity>
              <TextInput
                style={[
                  viewSelectedHabitStyle.input,
                  { width: 50, textAlign: "center" },
                ]}
                keyboardType="numeric"
                value={habit.amount?.toString()}
                onChangeText={(val) => setAmount(val)}
              />
              <TouchableOpacity
                style={[viewSelectedHabitStyle.btn, {}]}
                onPress={() => setAmount(habit.amount + 1)}
              >
                <AntDesign name="plus" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  viewSelectedHabitStyle.btn,
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
                <Text style={viewSelectedHabitStyle.inputTitle}>Size type: </Text>
                <TextInput
                  style={[viewSelectedHabitStyle.input, { width: "60%" }]}
                  value={habit.amountType}
                  onChangeText={(val) =>
                    setHabit({ ...habit, amountType: val })
                  }
                  placeholder={`${habit.amount} (page) per day`}
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[mainStyle.row, mainStyle.between]}>
                <Text style={viewSelectedHabitStyle.inputTitle}>Daily change: </Text>
                <View style={[mainStyle.row]}>
                  <TouchableOpacity
                    style={[viewSelectedHabitStyle.btn, {}]}
                    onPress={() => setChange(habit.change - 1)}
                  >
                    <Ionicons name="trending-down" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      viewSelectedHabitStyle.input,
                      { width: 50, textAlign: "center" },
                    ]}
                    keyboardType="numeric"
                    value={habit.change?.toString()}
                    onChangeText={(val) => setChange(val)}
                  />
                  <TouchableOpacity
                    style={[viewSelectedHabitStyle.btn, {}]}
                    onPress={() => setChange(habit.change + 1)}
                  >
                    <Ionicons name="trending-up" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View> */}

        {/* remender */}
        {/* <View style={viewSelectedHabitStyle.catGroup}>
          <Text style={viewSelectedHabitStyle.inputTitle}>Reminder: </Text>
          <TouchableOpacity
            style={[viewSelectedHabitStyle.btn, { backgroundColor: "#3D3D46FF" }]}
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
        </View> */}

        {/* description */}
        {/* <View style={[viewSelectedHabitStyle.catGroup, { flexDirection: "column" }]}>
          <Text style={viewSelectedHabitStyle.inputTitle}>Description: </Text>
          <TextInput
            style={[
              viewSelectedHabitStyle.input,
              { width: "100%", margin: 5, padding: 10 },
            ]}
            multiline={true}
            value={habit.description}
            onChangeText={(val) => setHabit({ ...habit, description: val })}
            placeholder="The habit of reading books"
            placeholderTextColor="#999"
          />
        </View> */}
        {/* color */}
        {/* <View style={[viewSelectedHabitStyle.catGroup, { flexDirection: "column" }]}>
          <View style={[mainStyle.row]}>
            <Text style={viewSelectedHabitStyle.inputTitle}>Color: </Text>
            <View
              style={[
                viewSelectedHabitStyle.changetColor,
                { backgroundColor: `#${habit.color}` },
              ]}
            ></View>
          </View>
          <View style={[mainStyle.row, mainStyle.around]}>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[0]}`,
                  borderWidth: habit.color == colors[0] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[0])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[1]}`,
                  borderWidth: habit.color == colors[1] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[1])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[2]}`,
                  borderWidth: habit.color == colors[2] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[2])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[3]}`,
                  borderWidth: habit.color == colors[3] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[3])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[4]}`,
                  borderWidth: habit.color == colors[4] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[4])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[5]}`,
                  borderWidth: habit.color == colors[5] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[5])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[6]}`,
                  borderWidth: habit.color == colors[6] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[6])}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                viewSelectedHabitStyle.changetColor,
                {
                  backgroundColor: `#${colors[7]}`,
                  borderWidth: habit.color == colors[7] ? 2 : 0,
                },
              ]}
              onPress={() => changetColor(colors[7])}
            ></TouchableOpacity>
          </View>
        </View> */}

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewHabit;
