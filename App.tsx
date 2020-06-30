import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/reducers';
import { theme } from './src/styles';
import AppContainer from './src';

const store = createStore(rootReducer);

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider >
    </StoreProvider>
  );
}

export default App;