import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import style from './ControlBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import StatModal from "../StatModal/StatModal";

const NO_FORM = 'no_form';
const STAT_FORM = 'stat_form';

function ControlBlock({history, selectedGroup, selectedCard}) {
    let [currentForm, setCurrentForm] = useState(NO_FORM);

    let closeForm = () => setCurrentForm(NO_FORM);
    let showStatForm = () => setCurrentForm(STAT_FORM);

    let form;
    switch (currentForm) {
        case STAT_FORM:
            form = <StatModal closeForm={closeForm}/>;
            break
    }

    let modalContainerStyle = currentForm === NO_FORM ? {display: 'none'} : {display: 'flex'};

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
                <input type="button" value="Статистика" onClick={showStatForm}/>
            </div>
            <div className={style.modal_container} style={modalContainerStyle}>
                {form}
            </div>
        </>
    );
}

let stateMap = mapStateToPropsFactory('ControlBlock');
let dispatchMap = mapDispatchToPropsFactory('ControlBlock');
export default connect(stateMap, dispatchMap)(withRouter(ControlBlock));