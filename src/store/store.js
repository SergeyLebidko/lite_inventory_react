import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {
    account,
    resetPasswordUuid,
    accountControlMode,
    error
} from './reducers';

let combinedReducer = combineReducers({
    account,
    accountControlMode,
    resetPasswordUuid,
    error
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;