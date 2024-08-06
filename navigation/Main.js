import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, AntDesign, Ionicons, Octicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { getHabit } from "../services/habitDB";

// srceens
import Add from "./stackScreen/add";
import ViewHabit from "./stackScreen/viewHabit";

import Home from "./screens/home";
import TodoList from "./screens/todo";
import CheckHabit from "./screens/allHabits";
import Setting from "./screens/setting";
import Statistic from "./screens/statistic";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Main() {
  const [habits, setHabits] = useState("");
  const [selectHabit, setSelectHabit] = useState({
    amount: 2,
    amountType: "sdfsdf",
    change: 1,
    color: "08A34FFF",
    createdAt: "2024-01-02 11:12:01",
    description: "sdfsdf",
    frequency: 7,
    id: 1,
    name: "ghgsfdf",
    reminderActive: 0,
    reminderTime: "",
  });
  const fetchHabits = async () => {
    try {
      getHabit().then((data) => {
        if (data) {
          setHabits(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchHabits();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { height: 0 },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="main"
        options={{
          title: "",
        }}
      >
        {(props) => (
          <TabNavigationHadler
            {...props}
            habits={habits}
            setHabits={setHabits}
            fetchHabits={fetchHabits}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="addHabit"
        options={{
          title: "",
          cardStyle: { paddingTop: 60, backgroundColor: "#272730FF" },
        }}
      >
        {(props) => (
          <Add
            {...props}
            selectHabit={selectHabit}
            setSelectHabit={setSelectHabit}
            fetchHabits={fetchHabits}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
        name="viewHabit"
        options={{
          title: "",
          cardStyle: { paddingTop: 60, backgroundColor: "#272730FF" },
        }}
      >
        {(props) => (
          <ViewHabit
            {...props}
            selectHabit={selectHabit}
            setSelectHabit={setSelectHabit}
            fetchHabits={fetchHabits}
          />
        )}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}

const TabNavigationHadler = (props) => {
  const { habits, setHabits, fetchHabits } = props;
  return (
    <Tab.Navigator
      initialRouteName="Habits"
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 28 },
        headerStyle: { backgroundColor: "#272730FF" },
        tabBarStyle: { backgroundColor: "#272730FF" },
      }}
    >
      <Tab.Screen
        name="Today's habits"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size + 2} />
          ),
        }}
      >
        {(props) => (
          <Home {...props} habits={habits} fetchHabits={fetchHabits} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Habit statistics"
        options={{
          tabBarLabel: "", //"Today's habit",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" size={size+2} color={color} />
          ),
        }}
      >
        {(props) => (
          <CheckHabit {...props} habits={habits} fetchHabits={fetchHabits} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="TODO list"
        options={{
          tabBarLabel: "", //'Add',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="checklist" size={size + 2} color={color} />
          ),
        }}
      >
        {(props) => <TodoList {...props} fetchHabits={fetchHabits} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        component={Statistic}
        options={{
          tabBarLabel: "", //'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="note-edit-outline" 
              color={color}
              size={size + 2} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: "", //'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size + 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
