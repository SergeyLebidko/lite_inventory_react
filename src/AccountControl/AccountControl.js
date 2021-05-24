import React, {useEffect} from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import RemoveAccountForm from '../RemoveAccountForm/RemoveAccountForm';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import style from './AccountControl.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

export const ACCOUNT_CONTROL_MODES = {
    MENU_MODE: 'menu_mode',
    LOGIN_FORM_MODE: 'login_form_mode',
    REGISTER_FORM_MODE: 'register_form_mode',
    RESET_PASSWORD_FORM_MODE: 'reset_password_form_mode',
    REMOVE_ACCOUNT_FORM_MODE: 'remove_account_form_mode',
    CHANGE_PASSWORD_FORM_MODE: 'change_password_form_mode'
}

function AccountControl({mode, account, setMode, loadAccount, logout}) {

    // При монтированни компонента пытаемся получить данные аккаунта
    useEffect(() => loadAccount(), []);

    let cancelHandler = () => setMode(ACCOUNT_CONTROL_MODES.MENU_MODE);

    let content;
    let hasAccount = account !== null;

    switch (mode) {
        case ACCOUNT_CONTROL_MODES.MENU_MODE: {
            if (hasAccount) {
                // Отображаем меню, если пользователь залогинен
                content = (
                    <>
                        <h1 className={style.username_header}>
                            {account['first_name'] || account['last_name'] ?
                                `${account['first_name']} ${account['last_name']}`
                                :
                                account['username']
                            }
                        </h1>
                        <ul className={style.action_list}>
                            <li>
                                <input type="button" value="Мой инвентарь"/>
                            </li>
                            <li>
                                <input type="button" value="Редактировать аккаунт"/>
                            </li>
                            <li>
                                <input type="button"
                                       value="Сменить пароль"
                                       onClick={() => setMode(ACCOUNT_CONTROL_MODES.CHANGE_PASSWORD_FORM_MODE)}
                                />
                            </li>
                            <li>
                                <input type="button" value="Выйти" onClick={() => logout()}/>
                            </li>
                            <li>
                                <input type="button"
                                       value="Удалить аккаунт"
                                       onClick={() => setMode(ACCOUNT_CONTROL_MODES.REMOVE_ACCOUNT_FORM_MODE)}
                                />
                            </li>
                        </ul>
                    </>
                );
            } else {
                // Отображаем меню, если пользователь не залогинен
                content = (
                    <ul className={style.action_list}>
                        <li>
                            <input type="button"
                                   value="Войти"
                                   onClick={() => setMode(ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE)}
                            />
                        </li>
                        <li>
                            <input type="button"
                                   value="Зарегистрироваться"
                                   onClick={() => setMode(ACCOUNT_CONTROL_MODES.REGISTER_FORM_MODE)}
                            />
                        </li>
                        <li>
                            <input type="button"
                                   value="Сбросить пароль"
                                   onClick={() => setMode(ACCOUNT_CONTROL_MODES.RESET_PASSWORD_FORM_MODE)}
                            />
                        </li>
                    </ul>
                );
            }
            break;
        }
        case ACCOUNT_CONTROL_MODES.LOGIN_FORM_MODE: {
            content = <LoginForm cancelHandler={cancelHandler}/>;
            break;
        }
        case ACCOUNT_CONTROL_MODES.REGISTER_FORM_MODE: {
            content = <RegisterForm cancelHandler={cancelHandler}/>;
            break;
        }
        case ACCOUNT_CONTROL_MODES.RESET_PASSWORD_FORM_MODE: {
            content = <ResetPasswordForm cancelHandler={cancelHandler}/>
            break;
        }
        case ACCOUNT_CONTROL_MODES.REMOVE_ACCOUNT_FORM_MODE: {
            content = <RemoveAccountForm cancelHandler={cancelHandler}/>
            break;
        }
        case ACCOUNT_CONTROL_MODES.CHANGE_PASSWORD_FORM_MODE: {
            content = <ChangePasswordForm cancelHandler={cancelHandler}/>
            break;
        }
    }

    return (
        <div className={style.container}>
            {content}
        </div>
    );
}

let stateMap = mapStateToPropsFactory('AccountControl');
let dispatchMap = mapDispatchToPropsFactory('AccountControl');
export default connect(stateMap, dispatchMap)(AccountControl);

