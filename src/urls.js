const URL_PREFIX = 'http://localhost:8000/api/';

// Блок URL для работы с аккаунтом
export const LOGIN_URL = URL_PREFIX + 'login/';
export const ACCOUNT_DATA_URL = URL_PREFIX + 'account_data/';
export const REGISTER_URL = URL_PREFIX + 'register/';
export const LOGOUT_URL = URL_PREFIX + 'logout/';
export const RESET_PASSWORD_URL = URL_PREFIX + 'reset_password/';
export const RESET_PASSWORD_CONFIRM_URL = URL_PREFIX + 'reset_password_confirm/';
export const CHANGE_PASSWORD_URL = URL_PREFIX + 'change_password/';
export const EDIT_ACCOUNT_URL = URL_PREFIX + 'edit_account/';
export const REMOVE_ACCOUNT_URL = URL_PREFIX + 'remove_account/';

// Блок хуков для работы с группами, типами и оборудованием
export const GROUPS_URL = URL_PREFIX + 'groups/';
export const EQUIPMENT_CARDS_URL = URL_PREFIX + 'equipment_cards/';
export const EQUIPMENT_FEATURES_URL = URL_PREFIX + 'equipment_features';
export const EQUIPMENT_TYPES_URL = URL_PREFIX + 'equipment_types/';