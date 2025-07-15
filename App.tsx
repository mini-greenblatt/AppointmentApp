/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RootNavigation } from './src/navigation/appNavigator';

extend(customParseFormat);

function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

export default App;
