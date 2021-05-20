import React, {useState, useEffect} from 'react';
import style from './LoginForm.module.scss';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import mapStateToPropsFactory from '../store/stateMaps';

function LoginForm({error, clearError, login, cancelHandler}) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [inputError, setInputError] = useState(null);

    // Сбрасываем ошибки при монтировании и размонтированнии компонента
    useEffect(() => clearError(), []);

    let usernameChangeHandler = event => setUsername(event.target.value);

    let passwordChangeHandler = event => setPassword(event.target.value);

    let loginHandler = () => {
        let errorList = [];
        if (username.length === 0) errorList.push('Введите имя пользователя.');
        if (password.length === 0) errorList.push('Введите пароль.');
        if (errorList.length > 0) {
            setInputError(errorList.join(' '));
            setTimeout(() => setInputError(null), 4000);
            return;
        }
        login(username, password);
    }

    return (
        <div className={style.container}>
            <h1>Введите учетные данные:</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="username_field">Логин:</label>
                    </td>
                    <td>
                        <input id="username_field"
                               type="text"
                               value={username}
                               onChange={usernameChangeHandler}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password_field">Пароль:</label>
                    </td>
                    <td>
                        <input id="password_field"
                               type="password"
                               value={password}
                               onChange={passwordChangeHandler}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            {error ? <div className="error">{error}</div> : ''}
            {inputError ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Войти" onClick={loginHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('LoginForm');
let dispatchMap = mapDispatchToPropsFactory('LoginForm');
export default connect(stateMap, dispatchMap)(LoginForm);