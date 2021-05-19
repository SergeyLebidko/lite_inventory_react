import $ from 'jquery';
import {SET_ACCOUNT, CLEAR_ACCOUNT, SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR} from './actions';
import {LOGIN_URL, ACCOUNT_DATA_URL, LOGOUT_URL} from '../settings';

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
                localStorage.removeItem(TOKEN_NAME);
            })
        }
    }
}

// Функция загружает и сохраняет в local storage токен, полученный по переданным логину и паролю
export function loadToken(username, password) {
    return dispatch => {
        $.ajax(LOGIN_URL, {
            method: 'post',
            data: {
                username,
                password
            }
        }).then(data => {
            localStorage.setItem(TOKEN_NAME, data.token);
            dispatch(loadAccount());
            dispatch(clearLoginError());
        }).catch(() => {
            dispatch(setLoginError());
        })
    }
}

// Функция вызывает хук logout и очищает токен в local storage и данные аккаунта в redux
export function logoutAccount() {
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

function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account
    }
}

function clearAccount() {
    return {
        type: CLEAR_ACCOUNT
    }
}

function setLoginError() {
    return {
        type: SET_LOGIN_ERROR,
        error: true
    }
}

function clearLoginError() {
    return {
        type: SET_LOGIN_ERROR,
        error: false
    }
}
