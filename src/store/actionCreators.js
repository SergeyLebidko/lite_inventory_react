import $ from 'jquery';
import * as act from './actions';
import * as url from '../urls';

import {ACCOUNT_CONTROL_MODES} from '../AccountControl/AccountControl';
import {CONTROL_BLOCK_MODE} from '../ControlBlock/ControlBlock';

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
            if (err.status === 400) dispatch(setError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
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
            dispatch(clearError());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
        }).catch(err => {
            localStorage.removeItem(TOKEN_NAME);
            dispatch(clearAccount());
            if (err.statusText === 'Forbidden') dispatch(setError('Неверное имя пользователя и/или пароль.'));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
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
            if (err.status === 400) dispatch(setError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
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
            dispatch(clearError());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 400 || err.status === 403) dispatch(setError(err.responseJSON['detail']));
            if (err.status === 404) dispatch(setError('Неверный UUID запроса. Попробуйте запросить код сброса еще раз.'));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
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
            dispatch(clearError());
            dispatch(clearAccount());
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE));
        }).catch(err => {
            if (err.status === 403 || err.status === 400) dispatch(setError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
        });
    }
}

// Функция выполняет редактирование аккаунта
export function editAccount(data) {
    return dispatch => {
        // Если никакие поля не были изменены, то просто переходим обратно в меню операций с аккаунтом
        if (Object.keys(data).length === 0) {
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
            return;
        }
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.EDIT_ACCOUNT_URL, {
            method: 'patch',
            headers: {
                authorization: token
            },
            data
        }).then(editedAccount => {
            dispatch(setAccount(editedAccount));
            dispatch(setAccountControlMode(ACCOUNT_CONTROL_MODES.MENU_MODE));
        }).catch(err => {
            if (err.status === 400 || err.status === 403) dispatch(setError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError('Произошла сетевая ошибка.'));
            setTimeout(() => dispatch(clearError()), 4000);
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
            dispatch(clearError());
        }).catch(err => {
            if (err.status === 403) dispatch(setError(err.responseJSON['detail']));
            if (err.statusText === 'error') dispatch(setError('Сервис временно недоступен.'));
            setTimeout(() => dispatch(clearError()), 4000);
        });
    }
}

// Функция выполняет загрузку списка групп
export function loadGroups() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.GROUPS_URL, {
            headers: {
                authorization: token
            }
        }).then(groups => {
            dispatch(setGroups(groups));
        }).catch(() => {
            dispatch(clearGroups());
            dispatch(setGroupsLoadError('Не удалось загрузить список групп'));
        });
    }
}

// Функция выполняет создание группы
export function createGroup(title, group) {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.GROUPS_URL, {
            method: 'post',
            headers: {
                authorization: token
            },
            data: {title, group}
        }).then(createdGroup => {
            dispatch(addGroup(createdGroup));
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODE.NO_FORM));
        }).catch(() => {
            dispatch(setError('Не удалось создать группу'));
            setTimeout(() => dispatch(clearError()), 4000);
        });
    }
}

// Функция выполняет загрузку списка оборудования
export function loadEquipments(group) {
    return async dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);

        // Функция для загрузки списка карточек
        let cardsLoader = () => $.ajax(url.EQUIPMENT_CARDS_URL, {
            headers: {
                authorization: token
            },
            data: {
                group: group.id
            }
        })

        // Функция для загрузки списка характеристик
        let featuresLoader = cards => {
            let deferred = $.Deferred();

            let featureRequests = [];
            for (let card of cards) {
                featureRequests.push(
                    $.ajax(url.EQUIPMENT_FEATURES_URL, {
                        headers: {
                            authorization: token
                        },
                        data: {
                            card: card.id
                        }
                    }).then(features => features)
                )
            }
            $.when(...featureRequests)
                .then((...features) => {
                    let featuresForStore = [];
                    for (let feature of features) featuresForStore = featuresForStore.concat(feature);
                    deferred.resolve(featuresForStore);
                }).catch(err => deferred.reject(err))

            return deferred.promise();
        }

        // Функция для загрузки списка типов оборудования
        let typesLoader = () => $.ajax(url.EQUIPMENT_TYPES_URL, {
            headers: {
                authorization: token
            }
        });

        try {
            let cards = await cardsLoader();
            let features = await featuresLoader(cards);
            let types = await typesLoader();

            // Записываем списки карточек, характеристик и типов (актуальных для переданной группы) в хранилище
            dispatch(clearLoadEquipmentsError());
            dispatch(setEquipmentCards(cards));
            dispatch(setEquipmentFeatures(features));
            dispatch(setEquipmentTypes(types));
        } catch (err) {

            // В случае невозможности загрузки списка карточек - сбрасываем состояние хранилища и диспатчим ошибку
            dispatch(clearEquipmentCards());
            dispatch(clearEquipmentFeatures());
            dispatch(clearEquipmentTypes());
            dispatch(setLoadEquipmentsError('Не удалось загрузить список оборудования'));
        }
    }
}

// Функция для выполнения загрузки статистики
export function loadStat() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.STAT_URL, {
            headers: {
                authorization: token
            }
        }).then(stat => {
            dispatch(setStat(stat));
        }).catch(() => {
            dispatch(clearStat());
            dispatch(setError('Не удалось загрузить статистику'));
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

export function setControlBlockMode(mode) {
    return {
        type: act.SET_CONTROL_BLOCK_MODE,
        mode
    }
}

export function setError(error) {
    return {
        type: act.SET_ERROR,
        error
    }
}

export function clearError() {
    return {
        type: act.CLEAR_ERROR
    }
}

export function setGroups(groups) {
    return {
        type: act.SET_GROUPS,
        groups
    }
}

export function addGroup(group) {
    return {
        type: act.ADD_GROUP,
        group
    }
}

export function clearGroups() {
    return {
        type: act.CLEAR_GROUPS
    }
}

export function setSelectedGroup(selectedGroup) {
    return {
        type: act.SET_SELECTED_GROUP,
        selectedGroup
    }
}

export function clearSelectedGroup() {
    return {
        type: act.CLEAR_SELECTED_GROUP
    }
}

export function setSelectedCard(selectedCard) {
    return {
        type: act.SET_SELECTED_CARD,
        selectedCard
    }
}

export function clearSelectedCard() {
    return {
        type: act.CLEAR_SELECTED_CARD
    }
}

export function setGroupsLoadError(loadError) {
    return {
        type: act.SET_GROUPS_LOAD_ERROR,
        loadError
    }
}

export function clearGroupsLoadError() {
    return {
        type: act.CLEAR_GROUPS_LOAD_ERROR
    }
}

export function setEquipmentCards(equipmentCards) {
    return {
        type: act.SET_EQUIPMENT_CARDS,
        equipmentCards
    }
}

export function clearEquipmentCards() {
    return {
        type: act.CLEAR_EQUIPMENT_CARDS
    }
}

export function setEquipmentFeatures(equipmentFeatures) {
    return {
        type: act.SET_EQUIPMENT_FEATURES,
        equipmentFeatures
    }
}

export function clearEquipmentFeatures() {
    return {
        type: act.CLEAR_EQUIPMENT_FEATURES
    }
}

export function setEquipmentTypes(equipmentTypes) {
    return {
        type: act.SET_EQUIPMENT_TYPES,
        equipmentTypes
    }
}

export function clearEquipmentTypes() {
    return {
        type: act.CLEAR_EQUIPMENT_TYPES
    }
}

export function setLoadEquipmentsError(loadError) {
    return {
        type: act.SET_LOAD_EQUIPMENTS_ERROR,
        loadError
    }
}

export function clearLoadEquipmentsError() {
    return {
        type: act.CLEAR_LOAD_EQUIPMENTS_ERROR
    }
}

export function setStat(stat) {
    return {
        type: act.SET_STAT,
        stat
    }
}

export function clearStat() {
    return {
        type: act.CLEAR_STAT
    }
}

export function setStatSort(section, field, reverseDirection) {
    return {
        type: act.SET_STAT_SORT,
        section,
        field,
        reverseDirection
    }
}