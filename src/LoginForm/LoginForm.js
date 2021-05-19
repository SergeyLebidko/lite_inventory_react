import React, {useState, useEffect} from 'react';
import style from './LoginForm.module.scss';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import mapStateToPropsFactory from '../store/stateMaps';

function LoginForm({loginError, loadToken, closeHandler}) {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    // При размонтировании обязательно вызываем хук закрытия
    useEffect(() => {
        return () => closeHandler();
    }, []);

    let loginChangeHandler = event => setLogin(event.target.value);

    let passwordChangeHandler = event => setPassword(event.target.value);

    let loginHandler = () => loadToken(login, password);

    return (
        <div className={style.container}>
            <h1>Введите учетные данные:</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="login_field">Логин:</label>
                    </td>
                    <td>
                        <input id="login_field" type="text" value={login} onChange={loginChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password_field">Пароль:</label>
                    </td>
                    <td>
                        <input id="password_field" type="password" value={password} onChange={passwordChangeHandler}/>
                    </td>
                </tr>
                </tbody>
            </table>
            {loginError ? <div>Ошибка!</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeHandler}/>
                <input type="button" value="Войти" onClick={loginHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('LoginForm');
let dispatchMap = mapDispatchToPropsFactory('LoginForm');
export default connect(stateMap, dispatchMap)(LoginForm);