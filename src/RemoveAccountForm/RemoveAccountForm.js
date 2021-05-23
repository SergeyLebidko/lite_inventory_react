import React from 'react';
import style from './RemoveAccount.form.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RemoveAccountForm({cancelHandler}) {
    return (
        <div>
            Здесь будет форма удаления аккаунта
            <input type="button" value="Отмена" onClick={cancelHandler}/>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RemoveAccountForm');
let dispatchMap = mapDispatchToPropsFactory('RemoveAccountForm');
export default connect(stateMap, dispatchMap)(RemoveAccountForm);
