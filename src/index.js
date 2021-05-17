import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './App';
import Login from './Login';
import Signup from './Signup';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" exact component={App} /> 
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
      </Router>
     
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
