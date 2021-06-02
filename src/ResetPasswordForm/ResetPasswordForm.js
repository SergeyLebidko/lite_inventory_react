import React, {useState, useEffect} from 'react';
import {validate} from 'email-validator';
import {connector} from '../store/storeConnector';
import style from './ResetPasswordForm.module.scss';
import {ERROR_TIMEOUT} from '../settings';

function ResetPasswordForm({error, uuid, resetPassword, resetPasswordConfirm, cancelHandler, clearError, clearUuid}) {
    let [inputError, setInputError] = useState(null);
    let [email, setEmail] = useState('');
    let [code, setCode] = useState('');
    let [password1, setPassword1] = useState('');
    let [password2, setPassword2] = useState('');

    // При монтировании сбрасываем ошибки и uuid
    useEffect(() => {
        clearError();
        clearUuid()
    }, []);

    // При получении uuid сбрасываем ошибки и содержимое полей
    useEffect(() => {
        clearError();
        setInputError(null);
    }, [uuid]);

    let emailChangeHandler = event => setEmail(event.target.value);
    let codeChangeHandler = event => setCode(event.target.value);
    let password1ChangeHandler = event => setPassword1(event.target.value);
    let password2ChangeHandler = event => setPassword2(event.target.value);

    // Обработчик отправки кода
    let sendCodeHandler = () => {
        if (!validate(email)) {
            setInputError('Введите корректный email');
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
            return;
        }
        resetPassword(email);
    }

    // Обработчик отправки пароля
    let sendPasswordHandler = () => {
        let errors = [];
        if (!code) errors.push('Введите код.');
        if (!password1 || !password2) errors.push('Введите новый пароль и подтверждение.');
        if (password1 !== password2) errors.push('Пароль и подтверждение не совпадают');
        if (errors.length > 0) {
            setInputError(errors.join(' '));
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
            return;
        }

        resetPasswordConfirm(uuid, code, password1);
    }

    return (
        <div className={style.container}>
            {uuid === null ?
                <h1>Введите адрес электронной почты, на который будет отправлен код для сброса пароля</h1>
                :
                <h1>Введите код сброса пароля и новый пароль</h1>
            }
            <table>
                <tbody>
                {uuid === null ?
                    <tr>
                        <td>
                            <label htmlFor="email_field">Адрес электронной почты:</label>
                        </td>
                        <td>
                            <input type="email" id="email_field" value={email} onChange={emailChangeHandler}/>
                        </td>
                    </tr>
                    :
                    <>
                        <tr>
                            <td>
                                <label htmlFor="code_field">Код из письма:</label>
                            </td>
                            <td>
                                <input type="text" id="code_field" value={code} onChange={codeChangeHandler}/>
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
                                       onChange={password1ChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password2_field">Новый пароль<br/>(ещё раз):</label>
                            </td>
                            <td>
                                <input type="password"
                                       id="password2_field"
                                       value={password2}
                                       onChange={password2ChangeHandler}
                                />
                            </td>
                        </tr>
                    </>
                }
                </tbody>
            </table>
            {error === null ? '' : <div className="error">{error}</div>}
            {inputError === null ? '' : <div className="error">{inputError}</div>}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                {uuid === null ?
                    <input type="button" value="Отправить код" onClick={sendCodeHandler}/>
                    :
                    <input type="button" value="Сбросить пароль" onClick={sendPasswordHandler}/>
                }
            </div>
        </div>
    );
}

export default connector(ResetPasswordForm);