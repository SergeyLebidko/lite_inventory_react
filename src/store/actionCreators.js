import $ from 'jquery';
import * as act from './actions';
import * as url from '../urls';

import {ACCOUNT_CONTROL_MODES} from '../AccountControl/AccountControl';
import {SET_RESET_PASSWORD_ERROR} from "./actions";

const TOKEN_NAME = 'li_token';

// Функция загружает данные аккаунта по полученному из local storage токену
export function loadAccount() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            $.ajax(url.ACCOUNT_DATA_URL, {
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

// Функция регистрирует аккаунт
export function register(username, password, email, firstName, lastName) {
    return dispatch => {
        $.ajax(url.REGISTER_URL, {
            method: 'post',
            data: {
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName
            }
        }).then(() => {
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 400) dispatch(setRegisterError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setRegisterError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearRegisterError()), 4000);
        });
    }
}

// Функция загружает и сохраняет в local storage токен, полученный по переданным логину и паролю
export function login(username, password) {
    return dispatch => {
        $.ajax(url.LOGIN_URL, {
            method: 'post',
            data: {
                username,
                password
            }
        }).then(data => {
            localStorage.setItem(TOKEN_NAME, data.token);
            return $.ajax(url.ACCOUNT_DATA_URL, {
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
            if (err.statusText === 'Forbidden') dispatch(setLoginError('Неверное имя пользователя и/или пароль.'));
            if (err.statusText === 'error') dispatch(setLoginError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearLoginError()), 4000);
        });
    }
}

// Функция отправляет email на хук сброса пароля и помещает в хранилище полученный uuid
export function resetPassword(email) {
    return dispatch => {
        $.ajax(url.RESET_PASSWORD_URL, {
            method: 'post',
            data: {email}
        }).then(data => {
            dispatch(setResetPasswordUuid(data.uuid));
        }).catch(err => {
            if (err.status === 400) dispatch(setResetPasswordError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setResetPasswordError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearResetPasswordError()), 4000);
        });
    }
}

// Функция отправляет на бекэнд код сброса пароля и новый пароль
export function resetPasswordConfirm(uuid, code, password) {
    return dispatch => {
        $.ajax(`${url.RESET_PASSWORD_CONFIRM_URL}${uuid}/`, {
            method: 'post',
            data: {
                code,
                password
            }
        }).then(() => {
            dispatch(clearResetPasswordUuid());
            dispatch(clearResetPasswordError());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 400 || err.status === 403) dispatch(setResetPasswordError(err.responseJSON['detail']));
            if (err.status === 404) dispatch(setResetPasswordError('Неверный UUID запроса. Попробуйте запросить код сброса еще раз'));
            if (err.statusText === 'error') dispatch(setResetPasswordError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearResetPasswordError()), 4000);
        });
    }
}

// Функция вызывает хук logout и очищает токен в local storage и данные аккаунта в redux
export function logout() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        if (token) {
            $.ajax(url.LOGOUT_URL, {
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

// Функция выплняет удаление аккаунта
export function removeAccount(password) {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.REMOVE_ACCOUNT_URL, {
            method: 'delete',
            headers: {
                'authorization': token
            },
            data: {password}
        }).then(() => {
            dispatch(clearAccount());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
            dispatch(clearRemoveAccountError());
        }).catch(err => {
            if (err.status === 403) dispatch(setRemoveAccountError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setRemoveAccountError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearRemoveAccountError()), 4000);
        });
    }
}

export function setAccount(account) {
    return {
        type: act.SET_ACCOUNT,
        account
    }
}

export function clearAccount() {
    return {
        type: act.CLEAR_ACCOUNT
    }
}

export function setLoginError(error) {
    return {
        type: act.SET_LOGIN_ERROR,
        error
    }
}

export function clearLoginError() {
    return {
        type: act.CLEAR_LOGIN_ERROR,
    }
}

export function setRegisterError(error) {
    return {
        type: act.SET_REGISTER_ERROR,
        error
    }
}

export function clearRegisterError() {
    return {
        type: act.CLEAR_REGISTER_ERROR
    }
}

export function setAccountControlMode(mode) {
    return {
        type: act.SET_ACCOUNT_CONTROL_MODE,
        mode
    }
}

export function setResetPasswordUuid(uuid) {
    return {
        type: act.SET_RESET_PASSWORD_UUID,
        uuid
    }
}

export function clearResetPasswordUuid() {
    return {
        type: act.CLEAR_RESET_PASSWORD_UUID
    }
}

export function setResetPasswordError(error) {
    return {
        type: act.SET_RESET_PASSWORD_ERROR,
        error
    }
}

export function clearResetPasswordError() {
    return {
        type: act.CLEAR_RESET_PASSWORD_ERROR
    }
}

export function setRemoveAccountError(error) {
    return {
        type: act.SET_REMOVE_ACCOUNT_ERROR,
        error
    }
}

export function clearRemoveAccountError() {
    return {
        type: act.CLEAR_REMOVE_ACCOUNT_ERROR
    }
}