export default function mapStateToPropsFactory(component) {
    switch (component) {
        case 'App':
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