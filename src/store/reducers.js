import * as act from './actions';
import {ACCOUNT_CONTROL_MODES} from './actionCreators';
import {CONTROL_BLOCK_MODES} from './actionCreators';

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

// Редуктор для режимов компонента с кнопками управления
export const controlBlockMode = (state = CONTROL_BLOCK_MODES.NO_FORM, action) => {
    switch (action.type) {
        case act.SET_CONTROL_BLOCK_MODE:
            return action.mode;
        default:
            return state;
    }
}

// Редуктор для работы с группами
export const groups = (state = null, action) => {
    switch (action.type) {
        case act.SET_GROUPS:
            return action.groups;
        case act.ADD_GROUP: {
            let nextState = [...state, action.group];
            nextState.sort((a, b) => {
                if (a.title > b.title) return 1;
                if (a.title === b.title) return 0;
                return -1;
            });
            return nextState;
        }
        case act.REMOVE_GROUP: {
            return state.filter(group => group.id !== action.group.id);
        }
        case act.RENAME_GROUP:
            return state.map(group => {
                if (group.id !== action.group.id) return group;
                return action.group;
            });
        case act.CLEAR_GROUPS:
            return null;
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

// Редуктор для работы с выбранной (selected) карточкой оборудования
export const selectedCard = (state = null, action) => {
    switch (action.type) {
        case act.SET_SELECTED_CARD:
            return action.selectedCard;
        case act.CLEAR_SELECTED_CARD:
            return null;
        default:
            return state;
    }
}

// Редуктор для работы с ошибками загрузки групп
export const groupsLoadError = (state = null, action) => {
    switch (action.type) {
        case act.SET_GROUPS_LOAD_ERROR:
            return action.loadError;
        case act.CLEAR_GROUPS_LOAD_ERROR:
            return null;
        default:
            return state
    }
}

// Редуктор для карточек оборудования
export const equipmentCards = (state = null, action) => {
    switch (action.type) {
        case act.SET_EQUIPMENT_CARDS:
            return action.equipmentCards;
        case act.CLEAR_EQUIPMENT_CARDS:
            return null;
        case act.ADD_EQUIPMENT_CARD:
            return [...state, action.card];
        case act.REPLACE_EQUIPMENT_CARD:
            return state.map(card => {
                if (card.id !== action.card.id) return card;
                return action.card;
            });
        case act.REMOVE_EQUIPMENT_CARD:
            return state.filter(card => card.id !== action.card.id);
        default:
            return state
    }
}

// Редактор для характеристик оборудования
export const equipmentFeatures = (state = [], action) => {
    switch (action.type) {
        case act.SET_EQUIPMENT_FEATURES:
            return action.equipmentFeatures;
        case act.CLEAR_EQUIPMENT_FEATURES:
            return [];
        default:
            return state;
    }
}

// Редуктор для работы с типами оборудования
export const equipmentTypes = (state = null, action) => {
    switch (action.type) {
        case act.SET_EQUIPMENT_TYPES:
            return action.equipmentTypes;
        case act.CLEAR_EQUIPMENT_TYPES:
            return null;
        default:
            return state;
    }
}

// Редуктор для ошибок загрузки списка оборудования и его характеристик
export const loadEquipmentsError = (state = null, action) => {
    switch (action.type) {
        case act.SET_LOAD_EQUIPMENTS_ERROR:
            return action.loadError;
        case act.CLEAR_LOAD_EQUIPMENTS_ERROR:
            return null;
        default:
            return state;
    }
}

// Редуктор для ошибок загрузки типов оборудования
export const loadTypesError = (state = null, action) => {
    switch (action.type) {
        case act.SET_LOAD_TYPES_ERROR:
            return action.loadError;
        case act.CLEAR_LOAD_TYPES_ERROR:
            return null;
        default:
            return state
    }
}

// Редуктор для работы со статистикой
export const stat = (state = null, action) => {
    switch (action.type) {
        case act.SET_STAT:
            return {...action.stat, sortParams: null};
        case act.CLEAR_STAT:
            return null;
        case act.SET_STAT_SORT:
            let {section, field, reverseDirection} = action;
            let arr = [...state[section]];
            arr.sort((a, b) => {
                let result;
                if (a[field] < b[field]) result = -1;
                if (a[field] === b[field]) result = 0;
                if (a[field] > b[field]) result = 1;
                if (reverseDirection) result *= -1;
                return result;
            });
            return {...state, [section]: arr, [section + '_sp']: `${field};${reverseDirection}`};
        default:
            return state;
    }
}

// ---------- Универсальный редуктор для отображения ошибок форм и модальных окон --------

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