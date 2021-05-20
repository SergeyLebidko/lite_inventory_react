import React, {useState, useEffect} from 'react';
import {validate} from 'email-validator';
import style from './RegisterForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RegisterForm({error, register, cancelHandler}) {
    let [inputError, setInputError] = useState(null);

    let [username, setUsername] = useState('');
    let [password1, setPassword1] = useState('');
    let [password2, setPassword2] = useState('');
    let [email, setEmail] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');

    let usernameChangeHandler = event => setUsername(event.target.value);
    let password1ChangeHandler = event => setPassword1(event.target.value);
    let password2ChangeHandler = event => setPassword2(event.target.value);
    let emailChangeHandler = event => setEmail(event.target.value);
    let firstNameChangeHandler = event => setFirstName(event.target.value);
    let lastNameChangeHandler = event => setLastName(event.target.value);

    let registerChangeHandler = () => {
        let errors = [];
        if (!username) errors.push('Введите имя пользователя.');
        if (!password1 || !password2) errors.push('Введите пароль и подтверждение пароля.');
        if (password1 && password2 && password1 !== password2) errors.push('Пароль и подтверждение пароля не совпадают.');
        if (!validate(email)) errors.push('Некорректный email.');

        if (errors.length > 0) {
            setInputError(errors.join(' '));
            setTimeout(() => setInputError(null), 4000);
            return;
        }

        register(username, password1, email, firstName, lastName)
    }

    return (
        <div className={style.container}>
            <h1>Введите данные для регистрации</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="username_field">Имя пользователя:</label>
                    </td>
                    <td>
                        <input type="text" id="username_field" value={username} onChange={usernameChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password1_field">Пароль:</label>
                    </td>
                    <td>
                        <input type="password" id="password1_field" value={password1}
                               onChange={password1ChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password2_field">Подтверждение пароля:</label>
                    </td>
                    <td>
                        <input type="password" id="password2_field" value={password2}
                               onChange={password2ChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email_field">Электронная почта:</label>
                    </td>
                    <td>
                        <input type="email" id="email_field" value={email} onChange={emailChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="first_name_field">Имя:</label>
                    </td>
                    <td>
                        <input type="text" id="first_name_field" value={firstName} onChange={firstNameChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="last_name_field">Фамилия:</label>
                    </td>
                    <td>
                        <input type="text" id="last_name_field" value={lastName} onChange={lastNameChangeHandler}/>
                    </td>
                </tr>
                </tbody>
            </table>
            {error ? <div className="error">{error}</div> : ''}
            {inputError ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Зарегистрировать" onClick={registerChangeHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RegisterForm');
let dispatchMap = mapDispatchToPropsFactory('RegisterForm');
export default connect(stateMap, dispatchMap)(RegisterForm);
