import $ from 'jquery';
import {SET_ACCOUNT, CLEAR_ACCOUNT, SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR, SET_ACCOUNT_CONTROL_MODE} from './actions';
import {LOGIN_URL, ACCOUNT_DATA_URL, LOGOUT_URL} from '../settings';

import {ACCOUNT_CONTROL_MODES} from '../AccountControl/AccountControl';

const TOKEN_NAME = 'li_token';

// Функция загружает данные аккаунта по полученному из local storage токену
export function loadAccount() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            $.ajax(ACCOUNT_DATA_URL, {
                headers: {
                    authorization: token
                }
            }).then(account => {
                dispatch(setAccount(account));
            }).catch(() => {
                dispatch(clearAccount());
                localStorage.removeItem(TOKEN_NAME);
            });
        }
    }
}

// Функция загружает и сохраняет в local storage токен, полученный по переданным логину и паролю
export function login(username, password) {
    return dispatch => {
        $.ajax(LOGIN_URL, {
            method: 'post',
            data: {
                username,
                password
            }
        }).then(data => {
            localStorage.setItem(TOKEN_NAME, data.token);
            return $.ajax(ACCOUNT_DATA_URL, {
                headers: {
                    authorization: data.token
                }
            });
        }).then(account => {
            dispatch(setAccount(account));
            dispatch(clearLoginError());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
        }).catch(err => {
            localStorage.removeItem(TOKEN_NAME);
            dispatch(clearAccount());
            if (err.statusText === 'Forbidden') dispatch(setLoginError('Неверное имя пользователя и/или пароль'));
            if (err.statusText === 'error') dispatch(setLoginError('Сервис временно недоступен'));
        });
    }
}

// Функция вызывает хук logout и очищает токен в local storage и данные аккаунта в redux
export function logout() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            $.ajax(LOGOUT_URL, {
                method: 'post',
                headers: {
                    authorization: token
                }
            }).always(() => {
                dispatch(clearAccount());
                localStorage.removeItem(TOKEN_NAME);
            });
        }
    }
}

export function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account
    }
}

export function clearAccount() {
    return {
        type: CLEAR_ACCOUNT
    }
}

export function setLoginError(error) {
    return {
        type: SET_LOGIN_ERROR,
        error
    }
}

export function clearLoginError() {
    return {
        type: CLEAR_LOGIN_ERROR,
    }
}

export function setAccountControlMode(mode) {
    return {
        type: SET_ACCOUNT_CONTROL_MODE,
        mode
    }
}
