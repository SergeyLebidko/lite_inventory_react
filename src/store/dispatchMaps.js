import {
    login,
    register,
    loadAccount,
    logout,
    setAccountControlMode,
    resetPassword,
    resetPasswordConfirm,
    clearResetPasswordUuid,
    removeAccount,
    changePassword,
    clearError
} from './actionCreators';

import {
    CLEAR_LOGIN_ERROR,
    CLEAR_REGISTER_ERROR,
    CLEAR_RESET_PASSWORD_ERROR,
    CLEAR_REMOVE_ACCOUNT_ERROR,
    CLEAR_CHANGE_PASSWORD_ERROR
} from './actions';

export default function mapDispatchToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return dispatch => ({
                loadAccount: () => dispatch(loadAccount()),
                logout: () => dispatch(logout()),
                setMode: mode => dispatch(setAccountControlMode(mode))
            })
        case 'LoginForm':
            return dispatch => ({
                login: (username, password) => dispatch(login(username, password)),
                clearError: () => dispatch(clearError(CLEAR_LOGIN_ERROR))
            });
        case 'RegisterForm':
            return dispatch => ({
                register: (username, password, email, firstName, lastName) => {
                    dispatch(register(username, password, email, firstName, lastName))
                },
                clearError: () => dispatch(clearError(CLEAR_REGISTER_ERROR))
            });
        case 'ResetPasswordForm':
            return dispatch => ({
                resetPassword: email => dispatch(resetPassword(email)),
                resetPasswordConfirm: (uuid, code, password) => dispatch(resetPasswordConfirm(uuid, code, password)),
                clearError: () => dispatch(clearError(CLEAR_RESET_PASSWORD_ERROR)),
                clearUuid: () => dispatch(clearResetPasswordUuid())
            });
        case 'RemoveAccountForm':
            return dispatch => ({
                remove: password => dispatch(removeAccount(password)),
                clearError: () => dispatch(clearError(CLEAR_REMOVE_ACCOUNT_ERROR))
            });
        case 'ChangePasswordForm':
            return dispatch => ({
                change: (currentPassword, nextPassword) => dispatch(changePassword(currentPassword, nextPassword)),
                clearError: () => dispatch(clearError(CLEAR_CHANGE_PASSWORD_ERROR))
            });
        default:
            return null
    }
}