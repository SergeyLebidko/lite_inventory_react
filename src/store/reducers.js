import * as act from './actions';
import {ACCOUNT_CONTROL_MODES} from '../AccountControl/AccountControl';

// Редуктор для действий с аккаунтом
export const account = (state = null, action) => {
    switch (action.type) {
        case act.SET_ACCOUNT:
            return action.account;
        case act.CLEAR_ACCOUNT:
            return null;
        default:
            return state
    }
}

// Редуктор для ошибок входа на сайт
export const loginError = (state = false, action) => {
    switch (action.type) {
        case act.SET_LOGIN_ERROR: {
            return true;
        }
        case act.CLEAR_LOGIN_ERROR: {
            return false;
        }
        default:
            return state
    }
}

// Редуктор для режимов компонента управления аккаунтом
export const accountControlMode = (state = ACCOUNT_CONTROL_MODES.MENU_MODE, action) => {
    switch (action.type) {
        case act.SET_ACCOUNT_CONTROL_MODE:
            return action.mode;
        default:
            return state;
    }
}