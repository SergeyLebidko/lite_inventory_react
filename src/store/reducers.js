import * as act from './actions';

// Редуктор для действий с аккаунтом
export const account = (state = null, action) => {
    switch (action.type) {
        case act.SET_ACCOUNT:
            return action.account;
        default:
            return state
    }
}

// Редуктор для ошибок входа на сайт
export const loginError = (state = false, action) => {
    switch (action.type) {
        case act.SET_LOGIN_ERROR: {
            return action.error
        }
        default:
            return state
    }
}