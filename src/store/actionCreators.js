import $ from 'jquery';
import * as act from './actions';
import * as url from '../urls';

import {ACCOUNT_CONTROL_MODES} from '../AccountControl/AccountControl';

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
            if (err.status === 400) dispatch(setError(act.SET_REGISTER_ERROR, err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError(act.SET_REGISTER_ERROR, 'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_REGISTER_ERROR)), 4000);
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
            dispatch(clearError(act.CLEAR_LOGIN_ERROR));
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
        }).catch(err => {
            localStorage.removeItem(TOKEN_NAME);
            dispatch(clearAccount());
            if (err.statusText === 'Forbidden') dispatch(setError(act.SET_LOGIN_ERROR, 'Неверное имя пользователя и/или пароль.'));
            if (err.statusText === 'error') dispatch(setError(act.SET_LOGIN_ERROR, 'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_LOGIN_ERROR)), 4000);
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
            if (err.status === 400) dispatch(setError(act.SET_RESET_PASSWORD_ERROR, err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError(act.SET_RESET_PASSWORD_ERROR, 'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_RESET_PASSWORD_ERROR)), 4000);
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
            dispatch(clearError(act.CLEAR_RESET_PASSWORD_ERROR));
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 400 || err.status === 403) dispatch(setError(act.SET_RESET_PASSWORD_ERROR, err.responseJSON['detail']));
            if (err.status === 404) dispatch(setError(act.SET_RESET_PASSWORD_ERROR, 'Неверный UUID запроса. Попробуйте запросить код сброса еще раз.'));
            if (err.statusText === 'error') dispatch(setError(act.SET_RESET_PASSWORD_ERROR, 'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_RESET_PASSWORD_ERROR)), 4000);
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

// Функция выполняет смену пароля
export function changePassword(currentPassword, nextPassword) {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.CHANGE_PASSWORD_URL, {
            method: 'post',
            headers: {
                authorization: token
            },
            data: {
                password: currentPassword,
                next_password: nextPassword
            }
        }).then(() => {
            localStorage.removeItem(TOKEN_NAME);
            dispatch(clearError(act.CLEAR_CHANGE_PASSWORD_ERROR));
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 403 || err.status === 400) dispatch(setError(act.SET_CHANGE_PASSWORD_ERROR, err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError(act.SET_CHANGE_PASSWORD_ERROR, 'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_CHANGE_PASSWORD_ERROR)), 4000);
        });
    }
}

// Функция выполняет удаление аккаунта
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
            localStorage.removeItem(TOKEN_NAME);
            dispatch(clearAccount());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
            dispatch(clearError(act.CLEAR_REMOVE_ACCOUNT_ERROR));
        }).catch(err => {
            if (err.status === 403) dispatch(setError(act.SET_REMOVE_ACCOUNT_ERROR, err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError(act.SET_REMOVE_ACCOUNT_ERROR,'Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError(act.CLEAR_REMOVE_ACCOUNT_ERROR)), 4000);
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

export function setError(errorType, error) {
    return {
        type: errorType,
        error
    }
}

export function clearError(errorType) {
    return {
        type: errorType
    }
}