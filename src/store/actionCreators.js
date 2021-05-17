import $ from 'jquery';
import {SET_ACCOUNT, SET_TOKEN, SET_LOGIN_ERROR} from './actions';
import {LOGIN_URL, ACCOUNT_DATA_URL} from '../settings';

export function loadAccount() {
    return dispatch => {
        let token = localStorage.getItem('li_token');
        if (token) {
            $.ajax(ACCOUNT_DATA_URL, {
                headers: {
                    authorization: token
                }
            }).then(account => {
                dispatch(setAccount(account));
            }).catch(err => {
                localStorage.removeItem('li_token');
            })
        }
    }
}

export function loadToken(username, password) {
    return dispatch => {
        $.ajax(LOGIN_URL, {
            method: 'post',
            data: {
                username,
                password
            }
        }).then(data => {
            localStorage.setItem('li_token', data.token);
            dispatch(setToken(data.token));
            dispatch(loadAccount());
        }).catch(() => {
            dispatch(setLoginError(true));
        })
    }
}

function setToken(token) {
    return {
        type: SET_TOKEN,
        token
    }
}

function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account
    }
}

function setLoginError(error) {
    return {
        type: SET_LOGIN_ERROR,
        error
    }
}
