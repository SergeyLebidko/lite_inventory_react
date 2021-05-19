import React, {useEffect} from 'react';
import style from './AccountControl.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import LoginForm from "../LoginForm/LoginForm";

function AccountControl({account, loadAccount, logoutAccount}) {

    // При монтированни компонента пытаемся получить данные аккаунта
    useEffect(() => loadAccount(), []);

    return (
        <div className={style.container}>
            {account !== null ?
                <div>
                    Добро пожаловать в LiteInventory, {account.username}
                    <button onClick={() => logoutAccount()}>Выйти</button>
                </div>
                :
                <LoginForm/>
            }
        </div>
    );
}

let stateMap = mapStateToPropsFactory('AccountControl');
let dispatchMap = mapDispatchToPropsFactory('AccountControl');
export default connect(stateMap, dispatchMap)(AccountControl);

