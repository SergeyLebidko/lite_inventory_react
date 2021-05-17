import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {account} from './reducers';

let store = createStore(combineReducers({account}), applyMiddleware(thunk));

export default store;