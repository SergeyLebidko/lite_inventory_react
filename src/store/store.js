import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {account, token, loginError} from './reducers';

let combinedReducer = combineReducers({
    account,
    token,
    loginError
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;