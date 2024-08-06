import { NavigationContainer } from '@react-navigation/native';
import Main from './navigation/Main';
import { useEffect, useState } from 'react';
import {createHabitTable} from './services/habitDB';

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const createDbTables = () => {
    createHabitTable()
  }
  
  useEffect(() => {
    if (!initialized) {
      createDbTables()
      setInitialized(true);
    }
  }, [initialized]);
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
