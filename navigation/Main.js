import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';

// srceens
import Home from './screens/home';
import Add from './screens/add';

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#272730FF', height: 0 },
          tabBarActiveTintColor: '#e91e63',
          tabBarStyle: { backgroundColor: '#272730FF' }
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Home}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-sharp" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name="Add habit"
          component={Add}
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-add-circle-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={Home}
          options={{
            tabBarLabel: 'Statistic',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-bar-chart-outline" color={color} size={size}  />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Home}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }