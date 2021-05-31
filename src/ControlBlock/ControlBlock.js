import React, {useState, useRef, useEffect} from 'react';
import StatModal from '../StatModal/StatModal';
import GroupCreateModal from '../GroupCreateModal/GroupCreateModal';
import {withRouter} from 'react-router-dom';
import style from './ControlBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

const NO_FORM = 'no_form';
const STAT_FORM = 'stat_form';
const GROUP_CREATE_FORM = 'group_create_form';

function ControlBlock({history, selectedGroup, selectedCard, hasGroups, hasCards}) {
    let [currentForm, setCurrentForm] = useState(NO_FORM);
    let modalContainerRef = useRef(null);

    let closeForm = () => setCurrentForm(NO_FORM);

    let showGroupCreateForm = () => setCurrentForm(GROUP_CREATE_FORM);
    let showStatForm = () => setCurrentForm(STAT_FORM);

    // Отслеживаем нажатие на клавишу Esc для закрытия форм
    useEffect(() => {
        let formContainerKeyHandler = event => {
            if (event.key === 'Escape' && currentForm !== NO_FORM) closeForm();
        };
        document.addEventListener('keydown', formContainerKeyHandler)
        return () => document.removeEventListener('keydown', formContainerKeyHandler);
    })

    // Обработчик клика на поле вокруг модального окна. Закрывает модальное окно
    let formContainerMouseHandler = event => {
        if (event.target !== modalContainerRef.current) return;
        closeForm();
    }

    let form;
    switch (currentForm) {
        case STAT_FORM:
            form = <StatModal closeForm={closeForm}/>;
            break;
        case GROUP_CREATE_FORM:
            form = <GroupCreateModal closeForm={closeForm}/>;
            break;
    }

    let modalContainerStyle = currentForm === NO_FORM ? {display: 'none'} : {display: 'flex'};

    return (
        <>
            <div className={`${style.container} ${style.group_control}`}>
                <input type="button" disabled={!hasGroups} value="Добавить" onClick={showGroupCreateForm}/>
                <input type="button" disabled={!Boolean(selectedGroup)} value="Переименовать"/>
                <input type="button" disabled={!Boolean(selectedGroup)} value="Удалить"/>
            </div>
            <div className={`${style.container} ${style.equipment_control}`}>
                <input type="button" value="На главную" onClick={() => history.push('/')}/>
                <input type="button" disabled={!hasCards} value="Добавить"/>
                <input type="button" disabled={!Boolean(selectedCard)} value="Редактировать"/>
                <input type="button" disabled={!Boolean(selectedCard)} value="Удалить"/>
                <input type="button" disabled={!hasGroups} value="Статистика" onClick={showStatForm}/>
            </div>
            <div ref={modalContainerRef} className={style.modal_container} style={modalContainerStyle}
                 onClick={formContainerMouseHandler}>
                {form}
            </div>
        </>
    );
}

let stateMap = mapStateToPropsFactory('ControlBlock');
let dispatchMap = mapDispatchToPropsFactory('ControlBlock');
export default connect(stateMap, dispatchMap)(withRouter(ControlBlock));