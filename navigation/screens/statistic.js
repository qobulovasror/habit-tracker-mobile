import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import mainStyle from "../../assets/styles/mainStyle";
import settingStyle from "../../assets/styles/settingStyle";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Statistic = () => {
  
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={"light-content"}
        style="light"
      />
      <ScrollView
        style={{ paddingHorizontal: 5, marginTop: 5, marginBottom: 50 }}
      >
        
      </ScrollView>
    </SafeAreaView>
  );
};
export default Statistic;
