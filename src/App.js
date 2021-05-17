import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import './App.css';

import {connect} from 'react-redux';
import {accountStateMap} from './store/stateMaps';

function App({account}) {
    return (
        <div>
            Аккаунт сейчас: {account !== null ? 'Есть' : 'Нет'}
            <LoginForm/>
        </div>
    );
}

export default connect(accountStateMap)(App);
