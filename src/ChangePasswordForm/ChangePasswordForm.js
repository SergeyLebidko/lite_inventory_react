import React from 'react';
import style from './ChangePasswordForm.module.scss';

import {connect} from 'react-redux'
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ChangePasswordForm({cancelHandler}) {
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
                        <input type="password" id="current_password_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password1_field">Новый пароль:</label>
                    </td>
                    <td>
                        <input type="password" id="password1_field"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password2_field">Новый пароль (ещё раз):</label>
                    </td>
                    <td>
                        <input type="password" id="password2_field"/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('ChangePasswordForm');
let dispatchMap = mapDispatchToPropsFactory('ChangePasswordForm');
export default connect(stateMap, dispatchMap)(ChangePasswordForm);