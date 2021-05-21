import {
    login,
    register,
    loadAccount,
    logout,
    setAccountControlMode,
    clearLoginError,
    clearRegisterError,
    resetPassword
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
                resetPassword: email => dispatch(resetPassword(email))
            });
        default:
            return null
    }
}