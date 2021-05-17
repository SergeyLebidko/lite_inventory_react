import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {account, token} from './reducers';

let combinedReducer = combineReducers({
    account,
    token
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;