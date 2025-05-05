import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import BottomTabs from './navigation/BottomTabs';

function Main() {
  const { theme } = useThemeContext();
  const [books, setBooks] = useState([]);

  return (
    <PaperProvider theme={theme}>
      <NativeBaseProvider>
        <NavigationContainer theme={theme}>
          <BottomTabs books={books} setBooks={setBooks} />
        </NavigationContainer>
      </NativeBaseProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
