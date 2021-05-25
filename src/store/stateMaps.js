export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return state => ({
                account: state.account,
                mode: state.accountControlMode
            });
        case 'RegisterForm':
            return state => ({
                error: state.error
            });
        case 'LoginForm':
            return state => ({
                error: state.error
            });
        case 'ResetPasswordForm':
            return state => ({
                error: state.error,
                uuid: state.resetPasswordUuid
            });
        case 'RemoveAccountForm':
            return state => ({
                error: state.error
            });
        case 'ChangePasswordForm':
            return state => ({
                error: state.error
            });
        case 'EditAccountForm':
            return state => ({
                account: state.account,
                error: state.error
            });
        default:
            return null
    }
}