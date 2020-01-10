import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import configureStore from './config/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#f44336'
    },
  },
})

ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme = { theme }>      
          <App />
      </MuiThemeProvider >
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
