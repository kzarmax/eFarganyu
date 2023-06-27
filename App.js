import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import AppRouter from './src/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
          <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
