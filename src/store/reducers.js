import * as t from './actions';

// Редуктор для действий с аккаунтом
export const account = (state = null, action) => {
    switch (action.type) {
        case t.SET_ACCOUNT:
            return action.account;
        default:
            return state
    }
}

// Редуктор для действий с токеном
export const token = (state = null, action) => {
    switch (action.type) {
        case t.SET_TOKEN: {
            return action.token;
        }
        default:
            return state
    }
}

// Редуктор для ошибок входа на сайт
export const loginError = (state = false, action) => {
    switch (action.type) {
        case t.SET_LOGIN_ERROR: {
            return action.error
        }
        default:
            return state
    }
}