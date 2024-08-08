import { NavigationContainer } from '@react-navigation/native';
import Main from './navigation/Main';
import { useEffect, useState } from 'react';
import createTables from './services/initialTables';

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const createDbTables = () => {
    createTables()
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
