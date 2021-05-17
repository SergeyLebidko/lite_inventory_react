import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {account, loginError} from './reducers';

let combinedReducer = combineReducers({
    account,
    loginError
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;