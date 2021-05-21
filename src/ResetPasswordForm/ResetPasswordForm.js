import React, {useState} from 'react';
import {validate} from 'email-validator';
import style from './ResetPasswordForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ResetPasswordForm({uuid, resetPassword, cancelHandler}) {
    let [inputError, setInputError] = useState(null);
    let [email, setEmail] = useState('');
    let [code, setCode] = useState('');
    let [password1, setPassword1] = useState('');
    let [password2, setPassword2] = useState('');

    let emailChangeHandler = event => setEmail(event.target.value);
    let codeChangeHandler = event => setCode(event.target.value);
    let password1ChangeHandler = event => setPassword1(event.target.value);
    let password2ChangeHandler = event => setPassword2(event.target.value);

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
                                <label htmlFor="password2_field">Новый пароль (ещё раз):</label>
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
            {inputError === null ? '' : <div className="error">{inputError}</div>}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
                {uuid === null ?
                    <input type="button" value="Отправить код"/>
                    :
                    <input type="button" value="Сбросить пароль"/>
                }
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('ResetPasswordForm');
let dispatchMap = mapDispatchToPropsFactory('ResetPasswordForm');
export default connect(stateMap, dispatchMap)(ResetPasswordForm);