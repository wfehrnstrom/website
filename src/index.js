import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import registerServiceWorker from './registerServiceWorker'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase'
import appReducers from './reducers'
import { config } from './firebase'
import './styles/index.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { getLocations } from './actions/mapDataActions'

firebase.initializeApp(config)

// Cloud Firestore startup
// settings prevents ominous built-in timestamps warning
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

const rootReducer = combineReducers({
  app: appReducers,
})

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware))
/* eslint-enable */

store.dispatch(getLocations())

const theme = createMuiTheme({
  overrides: {
    /* No Fillets on buttons */
    MuiButton: {
      root: {
        borderRadius: 0,
        fontWeight: 400,
      }
    }
  },
  palette: {
    primary: {
      main: '#FF5959',
    },
  },
  typography: {
    fontFamily: [
      'Aileron',
    ].join(","),
  }
})

ReactDOM.render(
  <MuiThemeProvider theme = {theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
