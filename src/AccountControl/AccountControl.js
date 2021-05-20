import React, {useEffect} from 'react';
import style from './AccountControl.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

export const ACCOUNT_CONTROL_MODES = {
    MENU_MODE: 'menu_mode',
    LOGIN_FORM_MODE: 'login_form_mode',
    REGISTER_FORM_MODE: 'register_form_mode'
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
                        <h1>
                            {account['first_name'] || account['last_name'] ?
                                `${account['first_name']} ${account['last_name']}`
                                :
                                account['username']
                            }
                        </h1>
                        <button onClick={() => logout()}>Выйти</button>
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
                            <input type="button" value="Сбросить пароль"/>
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

