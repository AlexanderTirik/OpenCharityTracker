import React from 'react';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { IntlProvider } from 'react-intl';
import Routing from './scenes/Routing';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </ChakraProvider>
    </IntlProvider>
  </React.StrictMode>,
);
