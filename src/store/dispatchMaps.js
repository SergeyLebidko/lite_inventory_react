import {
    login,
    register,
    loadAccount,
    logout,
    setAccountControlMode,
    clearLoginError,
    clearRegisterError,
    resetPassword,
    resetPasswordConfirm,
    clearResetPasswordError,
    clearResetPasswordUuid,
    removeAccount,
    changePassword,
    clearChangePasswordError
} from './actionCreators';

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
                clearError: () => dispatch(clearLoginError())
            });
        case 'RegisterForm':
            return dispatch => ({
                register: (username, password, email, firstName, lastName) => {
                    dispatch(register(username, password, email, firstName, lastName))
                },
                clearError: () => dispatch(clearRegisterError())
            });
        case 'ResetPasswordForm':
            return dispatch => ({
                resetPassword: email => dispatch(resetPassword(email)),
                resetPasswordConfirm: (uuid, code, password) => dispatch(resetPasswordConfirm(uuid, code, password)),
                clearError: () => dispatch(clearResetPasswordError()),
                clearUuid: () => dispatch(clearResetPasswordUuid())
            });
        case 'RemoveAccountForm':
            return dispatch => ({
                remove: password => dispatch(removeAccount(password))
            });
        case 'ChangePasswordForm':
            return dispatch => ({
                change: (currentPassword, nextPassword) => dispatch(changePassword(currentPassword, nextPassword)),
                clearError: () => dispatch(clearChangePasswordError())
            });
        default:
            return null
    }
}