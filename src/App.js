import React, {useEffect} from 'react';
import LoginForm from './LoginForm/LoginForm';
import './App.css';

import {connect} from 'react-redux';
import mapStateToPropsFactory from './store/stateMaps';
import mapDispatchToPropsFactory from './store/dispatchMaps';

function App({account, loadAccount}) {

    // При монтированни компонента пытаемся получить данные аккаунта
    useEffect(() => loadAccount(), []);

    return (
        <div>
            {account !== null ?
                <div>Добро пожаловать в LiteInventory, {account.username}</div>
                :
                <LoginForm/>
            }
        </div>
    );
}

export default connect(mapStateToPropsFactory('App'), mapDispatchToPropsFactory('App'))(App);
