import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import {BrowserRouter} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';


const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='765261387344-rhsot69j7plo0vico2snqd0m7u36qqh7.apps.googleusercontent.com'>
  <BrowserRouter>
  <Provider store={store}>
    <App />
 </Provider>
 </BrowserRouter>
 </GoogleOAuthProvider>
  
);
