import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import mainStyle from '../../assets/styles/mainStyle';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { deleteTodo, changeStatus } from '../../services/todoDB';

const TodoList = ({ navigation, todos, fetchTodos }) => {
  const openAddWin = () => {
    navigation.navigate('addTodo');
  };

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        barStyle={'light-content'}
        style="light"
      />
      <FlatList
        data={todos}
        style={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TodoItem item={item} fetchTodos={fetchTodos} />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const TodoItem = ({ item, fetchTodos }) => {
  const deleteHandler = (id) => {
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
            deleteTodo(id);
            fetchTodos();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const changeChecked = (item) => {
    changeStatus(item.id, item.status == 1 ? 0 : 1);
    fetchTodos();
  };
  return (
    <View
      style={{
        margin: 10,
        padding: 13,
        backgroundColor: '#36363FFF',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontSize: 20, color: '#fff', textDecorationLine: (item.status == 1)? 'line-through': 'none' }}>
        {item.status == 1 ? '✅  ' : ''} {item.name}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ padding: 0, marginEnd: 15 }}
          onPress={() => deleteHandler(item.id)}
        >
          <MaterialIcons name="delete-outline" size={28} color="#f00" />
        </TouchableOpacity>
        <Checkbox
          style={{ margin: 5 }}
          value={item.status == 1}
          onValueChange={() => changeChecked(item)}
          // onChange={() => changeChecked(item)}
        />
      </View>
    </View>
  );
};

export default TodoList;

//I will edit add btn
