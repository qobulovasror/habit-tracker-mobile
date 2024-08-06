import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import homeStyle from '../../assets/styles/homeStyle';
import { SelectList } from 'react-native-dropdown-select-list';
import mainStyle from '../../assets/styles/mainStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const CheckHabit = (props) => {
  const { navigation, habits } = props;

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar backgroundColor="#272730" barStyle={'light-content'} />
      <View style={{paddingHorizontal: 15, paddingTop: 10, marginStart: '35%'}}>
        <View style={[mainStyle.between, mainStyle.row]}>
          {week.map((day, index) => (
            <View style={[mainStyle.column, {borderColor: (day.num==new Date().getDate())? "#00f": "#fff"}]} key={index}>
              <Text style={homeStyle.weekTitle}>{day.day}</Text>
              <Text style={{ textAlign: 'center', color: '#fff' }}>
                {day.num}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ width: '100%' }}>
        <FlatList
          data={DATA}
          style={{ padding: 3 }}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckHabit;

const Item = ({ item }) => {
  return (
    <TouchableOpacity style={homeStyle.listItem}>
      <View style={[mainStyle.between, mainStyle.row]}>
        <Text style={homeStyle.itemTitle}>
          {String(item.name).length > 12
            ? item.name.slice(0, 10) + '...'
            : item.name}
        </Text>
        <CheckboxGroup />
      </View>
    </TouchableOpacity>
  );
};

const CheckboxGroup = () => {
  const list = [1,0,1,1,1,0,1]
  return (
    <View style={mainStyle.row}>
      {
        list.map((i, index)=>(
          <Checkbox 
            key={index}
            value={i==1} 
            onValueChange={() => {}} 
            style={{marginHorizontal: 6.5}} 
          />
        ))
      }
    </View>
  );
};

const DATA = [
  {
    amount: 2,
    amountType: 'sdfsdf',
    change: 1,
    color: '08A34FFF',
    createdAt: '2024-01-02 11:12:01',
    description: 'sdfsdf',
    frequency: 7,
    id: 1,
    name: 'ghgsfdf',
    reminderActive: 0,
    reminderTime: '',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Read book',
    reminder: false,
    activites: week,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Read book12345678',
    reminder: true,
    activites: week,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Read book',
    reminder: false,
    activites: week,
  },
];

const week = [
  { day: 'M', num: 20, status: 'none' },
  { day: 'T', num: 21 },
  { day: 'W', num: 22 },
  { day: 'T', num: 6 },
  { day: 'F', num: 24 },
  { day: 'S', num: 25 },
  { day: 'S', num: 26 },
];
