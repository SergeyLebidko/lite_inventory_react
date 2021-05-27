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

// Редуктор для управления uuid для сброса пароля
export const resetPasswordUuid = (state = null, action) => {
    switch (action.type) {
        case act.SET_RESET_PASSWORD_UUID: {
            return action.uuid
        }
        case act.CLEAR_RESET_PASSWORD_UUID: {
            return null
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

// Редуктор для работы с группами
export const groups = (state = [], action) => {
    switch (action.type) {
        case act.SET_GROUPS:
            return action.groups;
        case act.CLEAR_GROUPS:
            return [];
        default:
            return state;
    }
}

// Редуктор для работы с выбранной (selected) группой
export const selectedGroup = (state = null, action) => {
    switch (action.type) {
        case (act.SET_SELECTED_GROUP):
            return action.selectedGroup
        case (act.CLEAR_SELECTED_GROUP):
            return null;
        default:
            return state;
    }
}

// Редуктор для работы с ошибками загрузки групп
export const groupsLoadError = (state = null, action) => {
    switch (action.type){
        case act.SET_GROUPS_LOAD_ERROR:
            return action.loadError;
        case act.CLEAR_GROUPS_LOAD_ERROR:
            return null;
        default:
            return state
    }
}

// ---------- Универсальный редуктор для отображения ошибок форм --------

export const error = (state = null, action) => {
    switch (action.type) {
        case act.SET_ERROR:
            return action.error;
        case act.CLEAR_ERROR:
            return null;
        default:
            return state;
    }
}