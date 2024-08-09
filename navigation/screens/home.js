import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import checkHabitStyle from '../../assets/styles/checkHabitStyle';
import {
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import mainStyle from '../../assets/styles/mainStyle';
import homeStyle from '../../assets/styles/homeStyle';
import { addTracker } from '../../services/trackerDB';

export default function Home(props) {
  const { navigation, habits, setSelectHabit, fetchHabits, todaysTracks, fetchTrackers } =
    props;
  const openAddWin = () => {
    setSelectHabit(null);
    navigation.navigate('addHabit');
  };

  const addTrackerHandler = (id) => {
    Alert.alert(
      'Confirm Action',
      'Did you really do it?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            addTracker(id);
            fetchTrackers()
            fetchHabits();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const todaysHabit = habits?.filter((i) => {
    if (
      Number(i.frequency) >= new Date().getDay() &&
      !todaysTracks.includes(i.id)
    )
      return i;
  });

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar backgroundColor="#272730" barStyle={'light-content'} />
      <FlatList
        data={todaysHabit}
        style={{ padding: 5 }}
        renderItem={({ item }) => (
          <Item
            item={item}
            navigation={navigation}
            setSelectHabit={setSelectHabit}
            addTrackerHandler={addTrackerHandler}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={openAddWin}>
        <Ionicons name="ios-add-circle-outline" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Item = ({ item, setSelectHabit, navigation, addTrackerHandler }) => {
  const openAddHabitWinHandler = (item) => {
    setSelectHabit(item);
    navigation.navigate('addHabit');
  };
  return (
    <View style={checkHabitStyle.listItem}>
      <View style={[mainStyle.between, mainStyle.row]}>
        <View>
          <Text
            style={[checkHabitStyle.itemTitle, { fontSize: 23, marginTop: -5 }]}
          >
            {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
          </Text>
          <View style={[mainStyle.row]}>
            <Text style={homeStyle.itemText}>Amount: </Text>
            <Text style={homeStyle.itemText}>{item?.amount} </Text>
            <Text style={homeStyle.itemText}>{item?.amountType}</Text>
          </View>
        </View>
        <View style={mainStyle.row}>
          <TouchableOpacity
            onPress={() => openAddHabitWinHandler(item)}
            style={[homeStyle.itemBtn, { marginEnd: 10 }]}
          >
            <Feather name="edit-2" size={23} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addTrackerHandler(item.id)}
            style={[homeStyle.itemBtn, { backgroundColor: '#' + item.color }]}
          >
            <MaterialIcons name="check" size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
