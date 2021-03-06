import $ from 'jquery';
import * as act from './actions';
import * as url from '../urls';
import {ERROR_TIMEOUT} from '../settings';
import {getUpdates} from '../utils';

export const ACCOUNT_CONTROL_MODES = {
    MENU_MODE: 'menu_mode',
    LOGIN_FORM_MODE: 'login_form_mode',
    REGISTER_FORM_MODE: 'register_form_mode',
    RESET_PASSWORD_FORM_MODE: 'reset_password_form_mode',
    REMOVE_ACCOUNT_FORM_MODE: 'remove_account_form_mode',
    CHANGE_PASSWORD_FORM_MODE: 'change_password_form_mode',
    EDIT_ACCOUNT_FORM_MODE: 'edit_account_form_mode'
}

export const CONTROL_BLOCK_MODES = {
    NO_FORM: 'no_form',
    STAT_FORM: 'stat_form',
    GROUP_CREATE_FORM: 'group_create_form',
    REMOVE_GROUP_FORM: 'remove_group_form',
    RENAME_GROUP_FORM: 'rename_group_form',
    REMOVE_CARD_FORM: 'remove_card_form',
    EDIT_CARD_FORM: 'edit_card_form',
    CREATE_CARD_FORM: 'create_card_form',
    TYPES_FORM: 'types_form'

}

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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
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
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
        }).catch(() => {
            dispatch(setError('Не удалось создать группу'));
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
        });
    }
}

// Функция выполняет удаление группы
export function removeGroup(group) {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(`${url.GROUPS_URL}${group.id}/`, {
            method: 'delete',
            headers: {
                authorization: token
            }
        }).then(() => {
            dispatch({type: act.REMOVE_GROUP, group});
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
            dispatch(clearSelectedGroup());
        }).catch(() => {
            dispatch(setError('Не удалось удалить группу'));
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
        });
    }
}

// Функция выполняет переименование группы
export function renameGroup(groupId, currentTitle, nextTitle) {
    return dispatch => {
        if (currentTitle === nextTitle) {
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
            return;
        }

        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(`${url.GROUPS_URL}${groupId}/`, {
            method: 'patch',
            headers: {
                authorization: token
            },
            data: {
                title: nextTitle
            }
        }).then(group => {
            dispatch({type: act.RENAME_GROUP, group});
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
        }).catch(() => {
            dispatch(setError('Не удалось переименовать группу'));
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
        })
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

// Функция выполняет сохранение карточки оборудования
export function saveEquipmentCard(currentCard, nextCard, currentFeatures, nextFeatures) {
    return async dispatch => {
        // Снчала определяем, нужно ли производить с карточкой какое-либо действие
        let cardAction = 'no_action';
        if (currentCard) {
            if (JSON.stringify(currentCard) !== JSON.stringify(nextCard)) cardAction = 'update';
        } else {
            cardAction = 'create';
        }

        let token = localStorage.getItem(TOKEN_NAME);

        // Флаг ошибок, если true, то при выполнении запросов возникли ошибки и форму закрывать не нужно
        let hasError = false;

        // Если карточку нужно обновить или создать, то подготавливаем данные и выполняем запрос
        let savedCard = currentCard;
        if (cardAction !== 'no_action') {
            let method = cardAction === 'update' ? 'patch' : 'post';
            let cardUrl = cardAction === 'update' ? `${url.EQUIPMENT_CARDS_URL}${nextCard.id}/` : url.EQUIPMENT_CARDS_URL;

            let saveCard = () => $.ajax(cardUrl, {
                headers: {
                    authorization: token
                },
                method,
                data: {...nextCard}
            });

            try {
                savedCard = await saveCard();
                if (cardAction === 'update') {
                    dispatch(replaceEquipmentCard(savedCard));
                } else {
                    dispatch(addEquipmentCard(savedCard));
                }
                dispatch(setSelectedCard(savedCard));
            } catch (err) {
                hasError = true;
                dispatch(setError('Не удалось сохранить изменения в карточке'));
                setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
            }
        }

        // Подготавливаем списки характеристик
        let {toRemove, toUpdate, toCreate} = getUpdates(currentFeatures, nextFeatures, ['name', 'value']);
        if (toRemove.length > 0 || toUpdate.length > 0 || toCreate.length > 0) {
            // Присваиваем equipment_card всем объектам для создания
            for (let feature of toCreate) feature.equipment_card = savedCard.id;

            let saveFeature = () => $.ajax(url.UPDATE_FEATURES_LIST_URL, {
                method: 'post',
                headers: {
                    'authorization': token
                },
                data: {
                    to_remove: JSON.stringify(toRemove),
                    to_create: JSON.stringify(toCreate),
                    to_update: JSON.stringify(toUpdate)
                }
            });

            try {
                let savedFeatures = await saveFeature();
                dispatch(updateEquipmentFeatures(savedFeatures, savedCard))
            } catch (err) {
                hasError = true;
                dispatch(setError('Не удалось сохранить изменения в характеристиках оборудования'));
                setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
            }
        }

        // Если ошибок не возникло, то закрываем форму
        if (!hasError) dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
    }
}

// Функция выполняет загрузку списка типов оборудования
export function loadEquipmentTypes() {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(url.EQUIPMENT_TYPES_URL, {
            headers: {
                authorization: token
            }
        }).then(equipmentTypes => {
            dispatch(setEquipmentTypes(equipmentTypes));
        }).catch(() => {
            dispatch(setLoadTypesError('Не удалось загрузить список типов оборудования'));
        });
    }
}

// Функция выполняет обновление справочника типов оборудования
export function updateEquipmentTypes(currentTypes, nextTypes) {
    return async (dispatch, getState) => {
        let token = localStorage.getItem(TOKEN_NAME);
        let {toRemove, toUpdate, toCreate} = getUpdates(currentTypes, nextTypes, ['title']);

        let update = () => $.ajax(url.UPDATE_TYPES_LIST_URL, {
            method: 'post',
            headers: {
                authorization: token
            },
            data: {
                to_remove: JSON.stringify(toRemove),
                to_update: JSON.stringify(toUpdate),
                to_create: JSON.stringify(toCreate)
            }
        });

        try {
            if (toRemove.length > 0 || toUpdate.length > 0 || toCreate.length > 0) {
                let nextTypeList = await update();
                dispatch(setEquipmentTypes(nextTypeList));

                // После обновления списка типов обновляем список отображаемых карточек
                let selectedGroup = getState().selectedGroup;
                if (selectedGroup) {
                    dispatch(loadEquipments(selectedGroup));

                    // Проверяем, существует ли еще выделенная карточка. Если нет - сбрасываем её
                    let selectedCard = getState().selectedCard;
                    let cards = getState().equipmentCards;
                    let cardFind = false;
                    for (let card of cards) {
                        if (card.id === selectedCard.id) {
                            cardFind = true;
                            break;
                        }
                    }
                    if (!cardFind) dispatch(clearSelectedCard());
                }
            }
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
        } catch (err) {
            dispatch(setError('Не удалось сохранить данные'));
            setTimeout(() => dispatch(clearError()), ERROR_TIMEOUT);
        }
    }
}

// Функция выполняет удаление карточки оборудования
export function removeEquipmentCard(card) {
    return dispatch => {
        let token = localStorage.getItem(TOKEN_NAME);
        $.ajax(`${url.EQUIPMENT_CARDS_URL}${card.id}/`, {
            method: 'delete',
            headers: {
                authorization: token
            }
        }).then(() => {
            dispatch({type: act.REMOVE_EQUIPMENT_CARD, card});
            dispatch(setControlBlockMode(CONTROL_BLOCK_MODES.NO_FORM));
        }).catch(() => {
            dispatch(setError('Не удалось удалить карточку'));
            setTimeout(() => clearError(), ERROR_TIMEOUT);
        });
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

export function addEquipmentCard(card) {
    return {
        type: act.ADD_EQUIPMENT_CARD,
        card
    }
}

export function replaceEquipmentCard(card) {
    return {
        type: act.REPLACE_EQUIPMENT_CARD,
        card
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

export function updateEquipmentFeatures(equipmentFeatures, equipmentCard) {
    return {
        type: act.UPDATE_EQUIPMENT_FEATURES,
        equipmentFeatures,
        equipmentCard
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

export function setLoadTypesError(loadError) {
    return {
        type: act.SET_LOAD_TYPES_ERROR,
        loadError
    }
}

export function clearLoadTypesError() {
    return {
        type: act.CLEAR_LOAD_TYPES_ERROR
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