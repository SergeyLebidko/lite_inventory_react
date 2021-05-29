import React from 'react';
import {withRouter} from 'react-router-dom';
import style from './ControlBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function ControlBlock({history, selectedGroup, selectedCard}) {
    return (
        <>
            <div className={`${style.container} ${style.group_control}`}>
                <input type="button" value="Добавить"/>
                <input type="button" className={selectedGroup ? '' : style.no_available} value="Переименовать"/>
                <input type="button" className={selectedGroup ? '' : style.no_available} value="Удалить"/>
            </div>
            <div className={`${style.container} ${style.equipment_control}`}>
                <input type="button" value="На главную" onClick={() => history.push('/')}/>
                <input type="button" value="Добавить"/>
                <input type="button" className={selectedCard ? '' : style.no_available} value="Редактировать"/>
                <input type="button" className={selectedCard ? '' : style.no_available} value="Удалить"/>
                <input type="button" value="Статистика"/>
            </div>
        </>
    );
}

let stateMap = mapStateToPropsFactory('ControlBlock');
let dispatchMap = mapDispatchToPropsFactory('ControlBlock');
export default connect(stateMap, dispatchMap)(withRouter(ControlBlock));