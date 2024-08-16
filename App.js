// import { NavigationContainer } from '@react-navigation/native';
// // import Main from './navigation/Main';
// import { useEffect, useState } from 'react';
// // import createTables from './services/initialTables';

// import { createStackNavigator } from '@react-navigation/stack';
// import { Button, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Main />
//     </NavigationContainer>
//   );
// }

// const Stack = createStackNavigator();
// const Main = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="home"
//     >
//       <Stack.Screen
//         name="home"
//         component={Home}
//       />
      
//       <Stack.Screen
//         name="addHabit"
//         component={ChildComponent}
//       />
//     </Stack.Navigator>
//   );
// };

// const ChildComponent = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{textAlign: 'center', color: '#fff', fontSize: 25}}>Child component</Text>
//     </View>
//   );
// };

// const Home = (props) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignContent: 'center',
//       }}
//     >
//       <Text style={{ fontSize: 30, textAlign: 'center' }}>works</Text>
//       <Button
//         title="press"
//         onPress={() => props.navigation.navigate('addHabit')}
//       />
//     </View>
//   );
// };



import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
