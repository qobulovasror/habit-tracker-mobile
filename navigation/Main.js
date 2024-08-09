import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Feather,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { getHabit } from '../services/habitDB';
import { getTodos } from '../services/todoDB';
import { getNotes } from '../services/noteDB';
import { getTodayTrackers } from '../services/trackerDB';

// srceens
import AddHabit from './stackScreen/addHabit';
import AddTodo from './stackScreen/addToDo';
import AddNote from './stackScreen/addNotes';
import ViewHabit from './stackScreen/viewHabit';

import Home from './screens/home';
import TodoList from './screens/todo';
import CheckHabit from './screens/allHabits';
import Setting from './screens/setting';
import Notes from './screens/notes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Main() {
  const [habits, setHabits] = useState('');
  const [todos, setTodos] = useState('');
  const [notes, setNotes] = useState('');
  // const [tracks, setTrack] = useState('');
  const [todaysTracks, setTodaysTracks] = useState('');

  const [targetNote, setTargetNote] = useState(null)
  const [selectHabit, setSelectHabit] = useState(null);

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
  const fetchTodos = async () => {
    try {
      getTodos().then((data) => {
        if (data) {
          setTodos(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotes = async () => {
    try {
      getNotes().then((data) => {
        if (data) {
          setNotes(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrackers = async () => {
    try {
      getTodayTrackers().then((data) => {
        if (data) {
          console.log(data);
          
          setTodaysTracks(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchTodos();
    fetchNotes();
    fetchTrackers()
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { height: 0 },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="main"
        options={{
          title: '',
        }}
      >
        {(props) => (
          <TabNavigationHadler
            {...props}
            todos={todos}
            fetchTodos={fetchTodos}

            notes={notes}
            fetchNotes={fetchNotes}
            setTargetNote={setTargetNote}

            habits={habits}
            setHabits={setHabits}
            setSelectHabit={setSelectHabit}
            fetchHabits={fetchHabits}

            todaysTracks={todaysTracks}
            fetchTrackers={fetchTrackers}
          />
        )}
      </Stack.Screen>
      {/* add habit screen */}
      <Stack.Screen
        name="addHabit"
        options={{
          title: '',
          cardStyle: { paddingTop: 60, backgroundColor: '#272730FF' },
        }}
      >
        {(props) => (
          <AddHabit
            {...props}
            selectHabit={selectHabit}
            setSelectHabit={setSelectHabit}
            fetchHabits={fetchHabits}
          />
        )}
      </Stack.Screen>
      {/* add todo screen */}
      <Stack.Screen
        name="addTodo"
        options={{
          title: "",
          cardStyle: { paddingTop: 60, backgroundColor: "#272730FF" },
        }}
      >
        {(props) => (
          <AddTodo
            {...props}
            fetchTodos={fetchTodos}
          />
        )}
      </Stack.Screen>
      {/* add note screen */}
      <Stack.Screen
        name="addNote"
        options={{
          title: "",
          cardStyle: { paddingTop: 60, backgroundColor: "#272730FF" },
        }}
      >
        {(props) => (
          <AddNote
            {...props}
            fetchNotes={fetchNotes}
            targetNote={targetNote}
            setTargetNote={setTargetNote}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const TabNavigationHadler = (props) => {
  const { 
    habits, fetchHabits, setSelectHabit,
    todos, fetchTodos, setTargetNote,
    notes, fetchNotes,
    todaysTracks, fetchTrackers,
  } = props;
  return (
    <Tab.Navigator
      initialRouteName="Habits"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 28 },
        headerStyle: { backgroundColor: '#272730FF' },
        tabBarStyle: { backgroundColor: '#272730FF' },
      }}
    >
      <Tab.Screen
        name="Today's habits"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size + 2} />
          ),
        }}
      >
        {(props) => (
          <Home 
            {...props} 
            habits={habits} 
            fetchHabits={fetchHabits} 
            setSelectHabit={setSelectHabit} 
            todaysTracks={todaysTracks}
            fetchTrackers={fetchTrackers}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Habit statistics"
        options={{
          tabBarLabel: '', //"Today's habit",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" size={size + 2} color={color} />
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
          tabBarLabel: '', //'Add',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="checklist" size={size + 2} color={color} />
          ),
        }}
      >
        {(props) => <TodoList 
          {...props} 
          todos={todos}
          fetchTodos={fetchTodos} 
        />}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        options={{
          tabBarLabel: '', //'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-edit-outline" color={color} size={size + 2} />
          ),
        }}
      >
        {(props) => <Notes 
          {...props} 
          notes={notes} 
          fetchNotes={fetchNotes}
          setTargetNote={setTargetNote}
        />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: '', //'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size + 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
