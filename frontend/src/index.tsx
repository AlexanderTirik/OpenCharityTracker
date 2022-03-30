import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Home';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { IntlProvider } from 'react-intl';
import Routing from './scenes/Routing';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </ChakraProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
