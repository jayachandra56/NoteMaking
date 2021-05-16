import {createStore,applyMiddleware} from 'redux';
import loginReducer from './redux/loginReducer';
import thunk from 'redux-thunk'
  const store=createStore(loginReducer,applyMiddleware(thunk))
  export default store