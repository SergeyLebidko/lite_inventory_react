import React, {useState} from 'react';
import style from './ChangePasswordForm.module.scss';

import {connect} from 'react-redux'
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ChangePasswordForm({cancelHandler}) {
    let [currentPassword, setCurrentPassword] = useState('');
    let [password1, setPassword1] = useState('');
    let [password2, setPassword2] = useState('');
    let [inputError, setInputError] = useState(null);

    let changeCurrentPasswordHandler = event => setCurrentPassword(event.target.value);
    let changePassword1Handler = event => setPassword1(event.target.value);
    let changePassword2Handler = event => setPassword2(event.target.value);

    let saveNextPasswordHandler = () => {
        let errors = [];
        if (!currentPassword) errors.push('Введите текущий пароль.');
        if (!password1 || !password2) errors.push('Введите новый пароль и подтверждение.');
        if (password1 && password2 && password1 !== password2) errors.push('Пароль и подтверждение не совпадают.');
        if (errors.length > 0) {
            setInputError(errors.join(' '));
            setTimeout(() => setInputError(null), 4000);
            return;
        }

        // TODO Вставить код отправки на сервер
    }

    return (
        <div className={style.container}>
            <h1>Для смены пароля введите старый пароль, затем новый и его подтверждение</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="current_password_field">Текущий пароль:</label>
                    </td>
                    <td>
                        <input type="password"
                               id="current_password_field"
                               value={currentPassword}
                               onChange={changeCurrentPasswordHandler}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password1_field">Новый пароль:</label>
                    </td>
                    <td>
                        <input type="password"
                               id="password1_field"
                               value={password1}
                               onChange={changePassword1Handler}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password2_field">Новый пароль (ещё раз):</label>
                    </td>
                    <td>
                        <input type="password"
                               id="password2_field"
                               value={password2}
                               onChange={changePassword2Handler}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            {inputError === null ? '' : <div className="error">{inputError}</div>}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Сохранить" onClick={saveNextPasswordHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('ChangePasswordForm');
let dispatchMap = mapDispatchToPropsFactory('ChangePasswordForm');
export default connect(stateMap, dispatchMap)(ChangePasswordForm);