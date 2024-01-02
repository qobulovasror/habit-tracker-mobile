import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import mainStyle from '../../assets/styles/mainStyle';
import settingStyle from '../../assets/styles/settingStyle';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Setting = () => {
    const [setConfig, setSetConfig] = useState({
        language: "eng", //uzb
        theme: "dark",  //dark
        notif: "off", //on, medium
    });
    const [activeGroup, setActiveGroup] = useState({
        lang: false,
        theme: false,
        notif: false,
    })
    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar
                backgroundColor="#272730"
                barStyle={"light-content"}
                style="light"
            />
            {/* <Text style={[mainStyle.header, {margin: 10}]}>Settings</Text> */}
            <ScrollView style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 50 }}>
                    {/* lang */}
                    <View style={[settingStyle.catGroup, {flexDirection: 'column'}]}>
                        <View style={[mainStyle.row, mainStyle.between]}>
                            <Text style={[settingStyle.inputTitle, {fontSize: 23}]}>Language</Text>
                            <TouchableOpacity style={[settingStyle.btn, {transform: [{ rotate: activeGroup.lang?'180deg': "0deg"}]}]} onPress={()=>setActiveGroup({...activeGroup, lang: !activeGroup.lang})}>
                                <MaterialIcons name="expand-more" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {
                            activeGroup.lang && 
                            <View style={{margin: 10}}>
                                <TouchableOpacity style={settingStyle.confBtn}>
                                    <Text style={settingStyle.confBtnText}>English</Text>
                                    {
                                        setConfig.language=="eng" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={settingStyle.confBtn} disabled={setConfig.language!="uzb"}>
                                    <Text style={[settingStyle.confBtnText, {textDecorationLine: "line-through"}]}>Uzbek</Text>
                                    {
                                        setConfig.language=="uzb" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {/* notif */}
                    <View style={[settingStyle.catGroup, {flexDirection: 'column'}]}>
                        <View style={[mainStyle.row, mainStyle.between]}>
                            <Text style={[settingStyle.inputTitle, {fontSize: 23}]}>Notifation</Text>
                            <TouchableOpacity style={[settingStyle.btn, {transform: [{ rotate: activeGroup.notif?'180deg': "0deg"}]}]} onPress={()=>setActiveGroup({...activeGroup, notif: !activeGroup.notif})}>
                                <MaterialIcons name="expand-more" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {
                            activeGroup.notif && 
                            <View style={{margin: 10}}>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, notif: "on"})} disabled>
                                    <Text style={[settingStyle.confBtnText,{textDecorationLine: "line-through"}]}>Turn on</Text>
                                    {
                                        setConfig.notif=="on" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, notif: "medium"})} disabled>
                                    <Text style={[settingStyle.confBtnText, {textDecorationLine: "line-through"}]}>Turn on only important</Text>
                                    {
                                        setConfig.notif=="medium" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, notif: "off"})} disabled>
                                    <Text style={[settingStyle.confBtnText, ]}>Turn off</Text>
                                    {
                                        setConfig.notif=="off" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {/* mode */}
                    <View style={[settingStyle.catGroup, {flexDirection: 'column'}]}>
                        <View style={[mainStyle.row, mainStyle.between]}>
                            <Text style={[settingStyle.inputTitle, {fontSize: 23}]}>Theme</Text>
                            <TouchableOpacity style={[settingStyle.btn, {transform: [{ rotate: activeGroup.theme?'180deg': "0deg"}]}]} onPress={()=>setActiveGroup({...activeGroup, theme: !activeGroup.theme})}>
                                <MaterialIcons name="expand-more" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {
                            activeGroup.theme && 
                            <View style={{margin: 10}}>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, theme: "dark"})}>
                                    <Text style={settingStyle.confBtnText}>dark</Text>
                                    {
                                        setConfig.theme=="dark" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, theme: "light"})} disabled>
                                    <Text style={[settingStyle.confBtnText, {textDecorationLine: "line-through"}]}>light</Text>
                                    {
                                        setConfig.theme=="light" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={settingStyle.confBtn} onPress={()=>setSetConfig({...setConfig, theme: "auto"})} disabled>
                                    <Text style={[settingStyle.confBtnText, {textDecorationLine: "line-through"}]}>auto</Text>
                                    {
                                        setConfig.theme=="auto" && 
                                        <AntDesign name="check" size={24} color="#fff" />
                                    }
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                <TouchableOpacity style={settingStyle.saveBtn}>
                    <Text style={settingStyle.btnText}>Saqlash</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Setting;
