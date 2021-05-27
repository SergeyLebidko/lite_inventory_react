import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import * as reducersList from './reducers';

let combinedReducer = combineReducers(reducersList);
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;