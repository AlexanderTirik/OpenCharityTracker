import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { IntlProvider } from "react-intl";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [language, setLanguage] = useState("en");
  
  useEffect(() => {
    if (navigator.language) {
      setLanguage(navigator.language);
    }
  }, []);

  return (
    <IntlProvider locale={language}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </IntlProvider>
  );
};

export default MyApp;
