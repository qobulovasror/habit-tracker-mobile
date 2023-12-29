import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import {getHabit} from '../services/habitDB';

// srceens
import Home from './screens/home';
import Add from './screens/add';

const Tab = createBottomTabNavigator();

export default function Main() {
  const [habits, setHabits] = useState("")
  const fetchHabits = async () =>{
    try {
      getHabit().then(data=>{
        console.log(data);
        if(data){
          setHabits(data)
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchHabits()
  },[])
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#272730FF', height: 10 },
          tabBarActiveTintColor: '#e91e63',
          tabBarStyle: { backgroundColor: '#272730FF' }
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "",//'Home',
            tabBarIcon: ({ color, size}) => (
              <AntDesign name="home" color={color} size={size+2} />
            ),
          }}
        >
          {props => <Home {...props} habits={habits} fetchHabits={fetchHabits} />}
        </Tab.Screen>
        <Tab.Screen
          name="Today"
          component={Home}
          options={{
            tabBarLabel: "",//'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="checklist" size={size+2} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add habit"
          options={{
            tabBarLabel: "",//'Add',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-add-circle-outline" color={color} size={size+4} />
            ),
          }}
        >
          {props => <Add {...props} fetchHabits={fetchHabits} />}
        </Tab.Screen>
        <Tab.Screen
          name="Statistics"
          component={Home}
          options={{
            tabBarLabel: "",//'Statistic',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-bar-chart-outline" color={color} size={size+2}  />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Home}
          options={{
            tabBarLabel: "",//'Settings',
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size+2} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }