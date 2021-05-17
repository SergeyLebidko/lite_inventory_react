export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'AccountControl':
            return state => ({
                account: state.account
            })
        case 'LoginForm':
            return state => ({
                loginError: state.loginError
            })
        default:
            return {}
    }
}