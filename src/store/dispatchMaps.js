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
                clearError: () => dispatch(clearError())
            });
        case 'RegisterForm':
            return dispatch => ({
                register: (username, password, email, firstName, lastName) => {
                    dispatch(register(username, password, email, firstName, lastName))
                },
                clearError: () => dispatch(clearError())
            });
        case 'ResetPasswordForm':
            return dispatch => ({
                resetPassword: email => dispatch(resetPassword(email)),
                resetPasswordConfirm: (uuid, code, password) => dispatch(resetPasswordConfirm(uuid, code, password)),
                clearError: () => dispatch(clearError()),
                clearUuid: () => dispatch(clearResetPasswordUuid())
            });
        case 'RemoveAccountForm':
            return dispatch => ({
                remove: password => dispatch(removeAccount(password)),
                clearError: () => dispatch(clearError())
            });
        case 'ChangePasswordForm':
            return dispatch => ({
                change: (currentPassword, nextPassword) => dispatch(changePassword(currentPassword, nextPassword)),
                clearError: () => dispatch(clearError())
            });
        default:
            return null
    }
}