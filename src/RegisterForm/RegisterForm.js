import React, {useState, useEffect} from 'react';
import style from './RegisterForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RegisterForm({cancelHandler}) {
    let [inputError, setInputError] = useState(null);

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
                        <input type="text" id="username_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password1_field">Пароль:</label>
                    </td>
                    <td>
                        <input type="password" id="password1_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password2_field">Подтверждение пароля:</label>
                    </td>
                    <td>
                        <input type="password" id="password2_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email_field">Электронная почта:</label>
                    </td>
                    <td>
                        <input type="text" id="email_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="first_name_field">Имя:</label>
                    </td>
                    <td>
                        <input type="text" id="first_name_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="last_name_field">Фамилия:</label>
                    </td>
                    <td>
                        <input type="text" id="last_name_field"/>
                    </td>
                </tr>
                </tbody>
            </table>
            {inputError ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Зарегистрировать"/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RegisterForm');
let dispatchMap = mapDispatchToPropsFactory('RegisterForm');
export default connect(stateMap, dispatchMap)(RegisterForm);
