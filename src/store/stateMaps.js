import {changePasswordError} from "./reducers";

export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return state => ({
                account: state.account,
                mode: state.accountControlMode
            });
        case 'RegisterForm':
            return state => ({
                error: state.registerError
            });
        case 'LoginForm':
            return state => ({
                error: state.loginError
            });
        case 'ResetPasswordForm':
            return state => ({
                error: state.resetPasswordError,
                uuid: state.resetPasswordUuid
            });
        case 'RemoveAccountForm':
            return state => ({
                error: state.removeAccountError
            });
        case 'ChangePasswordForm':
            return state => ({
                error: state.changePasswordError
            });
        default:
            return null
    }
}