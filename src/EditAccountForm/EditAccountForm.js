import React, {useState, useEffect} from 'react';
import {validate} from 'email-validator';
import style from './EditAccountForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EditAccountForm({error, account, edit, clearError, cancelHandler}) {
    let [username, setUsername] = useState(account.username);
    let [email, setEmail] = useState(account.email);
    let [firstName, setFirstName] = useState(account.first_name);
    let [lastName, setLastName] = useState(account.last_name);

    let [inputError, setInputError] = useState(null);

    // Сбрасываем ошибки
    useEffect(() => clearError(), []);

    let usernameChangeHandler = event => setUsername(event.target.value);
    let emailChangeHandler = event => setEmail(event.target.value);
    let firstNameChangeHandler = event => setFirstName(event.target.value);
    let lastNameChangeHandler = event => setLastName(event.target.value);

    let saveHandler = () => {
        let errors = [];
        if (!username) errors.push('Введите имя пользователя.');
        if (!validate(email)) errors.push('Введите корректный email.');
        if (errors.length > 0) {
            setInputError(errors.join(' '));
            setTimeout(() => setInputError(null), 4000);
            return;
        }

        let data = {};
        if (username !== account.username) data = {...data, username};
        if (email !== account.email) data = {...data, email};
        if (firstName !== account.first_name) data = {...data, first_name: firstName};
        if (lastName !== account.last_name) data = {...data, last_name: lastName}
        edit(data);
    }

    return (
        <div className={style.container}>
            <h1>Введите новые данные</h1>
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
                        <label htmlFor="email_field">Адрес эл. почты:</label>
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
            {inputError === null ? '' : <div className="error">{inputError}</div>}
            {error === null ? '' : <div className="error">{error}</div>}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Сохранить" onClick={saveHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EditAccountForm');
let dispatchMap = mapDispatchToPropsFactory('EditAccountForm');
export default connect(stateMap, dispatchMap)(EditAccountForm);