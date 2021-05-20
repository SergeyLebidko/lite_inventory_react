import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {account, loginError, registerError, accountControlMode} from './reducers';

let combinedReducer = combineReducers({
    account,
    loginError,
    accountControlMode,
    registerError
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;