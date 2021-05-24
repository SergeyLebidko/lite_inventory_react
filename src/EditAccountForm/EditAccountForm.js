import React, {useState} from 'react';
import style from './EditAccountForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EditAccountForm({account, cancelHandler}) {
    let [username, setUsername] = useState(account.username);

    let usernameChangeHandler = event => setUsername(event.target.value);

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
                </tbody>
            </table>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EditAccountForm');
let dispatchMap = mapDispatchToPropsFactory('EditAccountForm');
export default connect(stateMap, dispatchMap)(EditAccountForm);