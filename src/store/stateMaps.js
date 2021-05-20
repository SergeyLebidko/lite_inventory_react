export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return state => ({
                account: state.account,
                mode: state.accountControlMode
            });
        case 'RegisterForm':
            return state => ({
                'error': state.registerError
            });
        case 'LoginForm':
            return state => ({
                error: state.loginError
            });
        default:
            return null
    }
}