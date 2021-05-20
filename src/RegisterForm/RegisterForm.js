import React from 'react';
import style from './RegisterForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RegisterForm({cancelHandler}){
    return (
        <div className={style.container}>
            <h1>Введите данные для регистрации</h1>
            <table>
                <tbody>

                </tbody>
            </table>

            <input/>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RegisterForm');
let dispatchMap = mapDispatchToPropsFactory('RegisterForm');
export default connect(stateMap, dispatchMap)(RegisterForm);
