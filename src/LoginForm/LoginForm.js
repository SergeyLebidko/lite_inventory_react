import React, {useState} from 'react';
import style from './LoginForm.module.scss';

import {connect} from 'react-redux';
import {accountDispatchMap} from '../store/dispatchMaps';

function LoginForm({loadAccount}) {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    let loginChangeHandler = event => {
        setLogin(event.target.value);
    }

    let passwordChangeHandler = event => {
        setPassword(event.target.value);
    }

    return (
        <div>
            Здесь будет форма для входа
            Логин: <input type={"text"} value={login} onChange={loginChangeHandler}/>
            Пароль: <input type={"text"} value={password} onChange={passwordChangeHandler}/>
            <input type={"button"} value={"Войти"} onClick={() => loadAccount(login, password)}/>
        </div>
    );
}

export default connect(null, accountDispatchMap)(LoginForm);