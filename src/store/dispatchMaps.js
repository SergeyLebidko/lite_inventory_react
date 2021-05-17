import {loadToken, loadAccount, logoutAccount} from './actionCreators';

export default function mapDispatchToPropsFactory(component) {
    switch (component) {
        case 'App':
            return dispatch => ({
                loadAccount: () => dispatch(loadAccount()),
                logoutAccount: () => dispatch(logoutAccount())
            })
        case 'LoginForm':
            return dispatch => ({
                loadToken: (username, password) => dispatch(loadToken(username, password))
            });
        default:
            return () => ({})
    }
}