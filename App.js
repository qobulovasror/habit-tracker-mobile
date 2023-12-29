import { NavigationContainer } from '@react-navigation/native';
import Main from './navigation/Main';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
