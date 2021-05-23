import React, {useState} from 'react';
import style from './RemoveAccount.form.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RemoveAccountForm({error, remove, cancelHandler}) {
    let [inputError, setInputError] = useState(null);
    let [password, setPassword] = useState('');

    let changePasswordHandler = event => setPassword(event.target.value);

    let removeClickHandler = () => {
        if (!password) {
            setInputError('Введите пароль');
            setTimeout(() => setInputError(null), 4000);
            return;
        }

        remove(password);
    }

    return (
        <div className={style.container}>
            <h1>Для удаления аккаунта введите текущий пароль</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="password_field">Текущий пароль:</label>
                    </td>
                    <td>
                        <input type="password" id="password_field" value={password} onChange={changePasswordHandler}/>
                    </td>
                </tr>
                </tbody>
            </table>
            {error !== null ? <div className="error">{error}</div> : ''}
            {inputError !== null ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Удалить" onClick={removeClickHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RemoveAccountForm');
let dispatchMap = mapDispatchToPropsFactory('RemoveAccountForm');
export default connect(stateMap, dispatchMap)(RemoveAccountForm);
