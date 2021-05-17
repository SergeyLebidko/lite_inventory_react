import $ from 'jquery';
import {SET_ACCOUNT, SET_LOGIN_ERROR} from './actions';
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
            }).catch(() => {
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
            dispatch(loadAccount());
            dispatch(setLoginError(false));
        }).catch(() => {
            dispatch(setLoginError());
        })
    }
}

function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account
    }
}

function setLoginError() {
    return {
        type: SET_LOGIN_ERROR,
        error: true
    }
}
