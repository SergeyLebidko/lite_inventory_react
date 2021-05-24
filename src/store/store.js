import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {
    account,
    loginError,
    registerError,
    resetPasswordError,
    resetPasswordUuid,
    accountControlMode,
    removeAccountError,
    changePasswordError
} from './reducers';

let combinedReducer = combineReducers({
    account,
    loginError,
    accountControlMode,
    registerError,
    resetPasswordUuid,
    resetPasswordError,
    removeAccountError,
    changePasswordError
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;