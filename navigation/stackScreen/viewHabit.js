import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import {
  LineChart,
} from "react-native-chart-kit";
import mainStyle from "../../assets/styles/mainStyle";
import { StatusBar } from "expo-status-bar";
import { viewSelectedHabitStyle } from "../../assets/styles/viewSelectedHabitStyle";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Dimensions } from "react-native";
import {Calendar} from 'react-native-calendars';
// import ToastManager, { Toast } from 'toastify-react-native'

import { deleteHabit } from "../../services/habitDB";
import {deleteTrackersByHabitId} from "../../services/trackerDB"

const screenWidth = Dimensions.get("window").width;


const ViewHabit = (props) => {
  const {
    navigation, 
    tracks, 
    viewSelectHabit, 
    setViewSelectHabit, 
    fetchHabits, 
    fetchTrackers
  } = props

  const [statisticPeriod, setStatisticPeriod] = useState(5) 

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

  const deleteTrackerHistrotyHandler = () => {
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
            deleteTrackersByHabitId(viewSelectHabit.id)
            fetchTrackers()
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

  const habitTracks = tracks.filter(i=>{
    return i.habitId === viewSelectHabit.id
  })

  const marketCalendarData = {} 
  habitTracks.forEach(element => {
    let itemDate = new Date(element.createAt)
    marketCalendarData[itemDate.toISOString().split('T')[0].toString()] = {selected: true, marked: true, selectedColor: 'blue'}
    // '2024-08-10': {selected: true, marked: true, selectedColor: 'blue'}
  });

  const statisticData = Array(statisticPeriod).fill(0)
  const months = getLastMonth(statisticPeriod)
  habitTracks.forEach(element => {
    let itemDate = new Date(element.createAt)
    const itemMonth = itemDate.toLocaleString('default', { month: 'short' });   
    ++statisticData[months.indexOf(itemMonth)];
  })

  return (
    <SafeAreaView style={[mainStyle.container]}>
      {/* <ToastManager/> */}
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <ScrollView style={{ paddingHorizontal: 10 }}>
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

        {/* History */}
        <View style={[mainStyle.row, mainStyle.between]}>
          <Text style={[viewSelectedHabitStyle.inputTitle, {fontSize: 21, paddingVertical: 5}]}>History </Text>
          <TouchableOpacity
            style={viewSelectedHabitStyle.clearBtn}
            onPress={deleteTrackerHistrotyHandler}
          >
            <MaterialCommunityIcons name="delete-clock-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={[viewSelectedHabitStyle.catGroup, {paddingVertical: 0}]}>
        <Calendar
            // Customize the appearance of the calendar
            style={{
              backgroundColor: "#34343DFF",
              height: 350,
            }}
            theme={{
              backgroundColor: '#34343DFF',
              calendarBackground: '#4D4D5BFF',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#fff',
              monthTextColor: "#fff",
              arrowColor: "#fff"
            }}
            onDayPress={day => {
              ToastAndroid.show(day.dateString, ToastAndroid.SHORT);
            }}
            markedDates={marketCalendarData}
          />
        </View>

        {/* Statistic */}
        <View style={[mainStyle.row, mainStyle.between]}>
          <Text style={[viewSelectedHabitStyle.inputTitle, {fontSize: 21, paddingVertical: 5}]}>Statistic </Text>
          <View style={[mainStyle.row]}>
            <TouchableOpacity
              onPress={()=>setStatisticPeriod(3)}
              style={[viewSelectedHabitStyle.swapBtn, {backgroundColor: (statisticPeriod==3)? "#00f": "#43434DFF"}]}
            >
              <Text style={[viewSelectedHabitStyle.btnText, {marginHorizontal: 7}]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>setStatisticPeriod(5)}
              style={[viewSelectedHabitStyle.swapBtn, {backgroundColor: (statisticPeriod==5)? "#00f": "#43434DFF"}]}
            >
              <Text style={[viewSelectedHabitStyle.btnText, {marginHorizontal: 7}]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>setStatisticPeriod(7)}
              style={[viewSelectedHabitStyle.swapBtn, {backgroundColor: (statisticPeriod==7)? "#00f": "#43434DFF"}]}
            >
              <Text style={[viewSelectedHabitStyle.btnText, {marginHorizontal: 7}]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>setStatisticPeriod(10)}
              style={[viewSelectedHabitStyle.swapBtn, {backgroundColor: (statisticPeriod==10)? "#00f": "#43434DFF"}]}
            >
              <Text style={[viewSelectedHabitStyle.btnText, {marginHorizontal: 7}]}>10</Text>
            </TouchableOpacity>

          </View>
        </View>
        <View style={[viewSelectedHabitStyle.catGroup, {paddingHorizontal: 10}]}>
          <LineChart
            data={{
              labels: months,
              datasets: [
                {
                  data: statisticData,
                  color: (opacity = 1) => `rgba(27,49,244, ${opacity})`, // optional
                  strokeWidth: 2 // optional
                }
              ],
              legend: [`Last ${statisticPeriod} month's statistics`] 
            }}
            width={screenWidth-40}
            height={230}
            verticalLabelRotation={10}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewHabit;


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.3,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.7,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const getLastMonth = (len=5) => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < len; i++) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = month.toLocaleString('default', { month: 'short' }); 
    months.push(monthName);
  }
  return months.reverse()
}
