import React from 'react';
import style from './RegisterForm.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function RegisterForm({cancelHandler}){
    return (
        <div>
            Здесь будет форма регистрации
        </div>
    );
}

let stateMap = mapStateToPropsFactory('RegisterForm');
let dispatchMap = mapDispatchToPropsFactory('RegisterForm');
export default connect(stateMap, dispatchMap)(RegisterForm);
