import React, {useState, useEffect} from 'react';
import style from './AccountControl.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import LoginForm from "../LoginForm/LoginForm";

const MENU_MODE = 'mm';
const LOGIN_FORM_MODE = 'lfm';

function AccountControl({account, loadAccount, logoutAccount}) {
    let [mode, setMode] = useState(MENU_MODE);

    // При монтированни компонента пытаемся получить данные аккаунта
    useEffect(() => loadAccount(), []);

    let closeHandler = () => setMode(MENU_MODE);

    let content;
    let hasAccount = account !== null;
    if (hasAccount) {
        let header = (
            <h1>
                {account['first_name'] || account['last_name'] ?
                    `${account['first_name']} ${account['last_name']}`
                    :
                    account['username']
                }
            </h1>
        );
        switch (mode) {
            case MENU_MODE:
                content = (
                    <>
                        {header}
                        <button onClick={() => logoutAccount()}>Выйти</button>
                    </>
                );
                break;
        }
    } else {
        switch (mode) {
            case MENU_MODE:
                content = (
                    <ul className={style.action_list}>
                        <li>
                            <input type="button" value="Войти" onClick={() => setMode(LOGIN_FORM_MODE)}/>
                        </li>
                        <li>
                            <input type="button" value="Зарегистрироваться"/>
                        </li>
                        <li>
                            <input type="button" value="Сбросить пароль"/>
                        </li>
                    </ul>
                );
                break;
            case LOGIN_FORM_MODE:
                content = <LoginForm closeHandler={closeHandler}/>;
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

