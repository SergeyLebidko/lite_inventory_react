import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './RemoveAccount.form.module.scss';
import {ERROR_TIMEOUT} from '../settings';

function RemoveAccountForm({error, clearError, remove, cancelHandler}) {
    let [inputError, setInputError] = useState(null);
    let [password, setPassword] = useState('');

    // Сбрасываем ошибки при монтировании/размонтировании компонента
    useEffect(() => clearError(), []);

    let changePasswordHandler = event => setPassword(event.target.value);

    let removeClickHandler = () => {
        if (!password) {
            setInputError('Введите пароль');
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
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
            {error ? <div className="error">{error}</div> : ''}
            {inputError ? <div className="error">{inputError}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                <input type="button" value="Удалить" onClick={removeClickHandler}/>
            </div>
        </div>
    );
}

export default connector(RemoveAccountForm);
