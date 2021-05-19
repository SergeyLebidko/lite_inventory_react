import {login, loadAccount, logout, setAccountControlMode} from './actionCreators';

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
                login: (username, password) => dispatch(login(username, password))
            });
        default:
            return () => ({})
    }
}