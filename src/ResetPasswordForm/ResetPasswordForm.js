import React, {useState} from 'react';
import {validate} from 'email-validator';
import style from './ResetPasswordForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ResetPasswordForm({uuid, resetPassword, cancelHandler}) {
    let [inputError, setInputError] = useState(null);

    return (
        <div className={style.container}>
            Здесь будет форма сброса пароля
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('ResetPasswordForm');
let dispatchMap = mapDispatchToPropsFactory('ResetPasswordForm');
export default connect(stateMap, dispatchMap)(ResetPasswordForm);