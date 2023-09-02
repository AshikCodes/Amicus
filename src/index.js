import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, extendBaseTheme, extendTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import clientReducer from './reducers/clientReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// const theme = extendTheme({
//   styles: {
//     global: () => ({
//       body: {
//         bg: ""
//       },
//     }),
//   },
// });

const theme = extendTheme({
  styles: {
        global: () => ({
          body: {
            bg: ""
          },
        }),
      }
      
});

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS={false}>
              <App client={queryClient}/>
            </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
