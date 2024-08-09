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
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import checkHabitStyle from '../../assets/styles/checkHabitStyle';

const CheckHabit = (props) => {
  const { navigation, habits, setViewSelectHabit } = props;

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar backgroundColor="#272730" barStyle={'light-content'} />
      <View style={{ width: '100%' }}>
        <FlatList
          data={habits}
          style={{ padding: 3 }}
          renderItem={({ item }) => (
            <Item 
              item={item} 
              setViewSelectHabit={setViewSelectHabit}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckHabit;

const Item = ({ item, navigation, setViewSelectHabit }) => {
  const openHandler = (item) => {
    setViewSelectHabit(item);
    navigation.navigate('viewHabit');
  };
  return (
    <View style={checkHabitStyle.listItem}>
      <View style={[mainStyle.between, mainStyle.row]}>
        <View>
          <Text
            style={[checkHabitStyle.itemTitle, { fontSize: 23, marginTop: -5 }]}
          >
            {item.name.length > 20 ? item.name.slice(0, 30) + '...' : item.name}
          </Text>
          <View style={[mainStyle.row]}>
            <Text style={homeStyle.itemText}>Amount: </Text>
            <Text style={homeStyle.itemText}>{item?.amount} </Text>
            <Text style={homeStyle.itemText}>{item?.amountType}</Text>
          </View>
        </View>
        <View style={mainStyle.row}>
          <TouchableOpacity
            onPress={() => openHandler(item)}
            style={[homeStyle.itemBtn, { backgroundColor: '#' + item.color }]}
          >
            <Ionicons name="open-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
