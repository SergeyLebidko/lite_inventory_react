import {SET_ACCOUNT} from './actions';

export const account = (state = null, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return action.account;
        default:
            return state
    }
}