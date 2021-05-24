import React from 'react';
import style from './ChangePasswordForm.module.scss';

import {connect} from 'react-redux'
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ChangePasswordForm({cancelHandler}) {
    return (
        <div className={style.container}>
            Здесь будет форма для смены пароля
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={cancelHandler}/>
            </div>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('ChangePasswordForm');
let dispatchMap = mapDispatchToPropsFactory('ChangePasswordForm');
export default connect(stateMap, dispatchMap)(ChangePasswordForm);