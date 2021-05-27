import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {
    account,
    resetPasswordUuid,
    accountControlMode,
    error,
    groups,
    selectedGroup,
    groupsLoadError
} from './reducers';

let combinedReducer = combineReducers({
    account,
    accountControlMode,
    resetPasswordUuid,
    error,
    groups,
    selectedGroup,
    groupsLoadError
});
let store = createStore(combinedReducer, {}, applyMiddleware(thunk));

export default store;