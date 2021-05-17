import {loadAccount} from './actionCreators';

export function accountDispatchMap(dispatch){
    return {
        loadAccount: (username, password) => dispatch(loadAccount(username, password))
    }
}