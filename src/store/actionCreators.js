import $ from 'jquery';
import {SET_ACCOUNT, SET_TOKEN} from './actions';
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
                console.log('При получении данных аккаунта по токену произошла ошибка:', err)
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
            dispatch(setToken(data.token));
            localStorage.setItem('li_token', data.token);
        }).catch(err => {
            console.log('При получении токена по логину/паролю произошла ошибка:', err);
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
