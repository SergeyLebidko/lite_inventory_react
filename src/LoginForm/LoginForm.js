import React, {useState} from 'react';
import style from './LoginForm.module.scss';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import mapStateToPropsFactory from '../store/stateMaps';

function LoginForm({loginError, loadToken}) {
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
            Для использования сервиса введите учетные данные:
            Логин: <input type={"text"} value={login} onChange={loginChangeHandler}/>
            Пароль: <input type={"text"} value={password} onChange={passwordChangeHandler}/>
            <input type={"button"} value={"Войти"} onClick={() => loadToken(login, password)}/>
            {loginError ? <div>Данные не верны</div> : ''}
        </div>
    );
}

export default connect(mapStateToPropsFactory('LoginForm'), mapDispatchToPropsFactory('LoginForm'))(LoginForm);