import React, {useEffect} from 'react';
import style from './GroupBlock.module.scss';
import GroupList from '../GroupList/GroupList';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import mapStateToPropsFactory from '../store/stateMaps';

function GroupBlock(props) {
    let {
        loadGroups,
        groupsLoadError,
        clearSelectedGroup,
        clearSelectedCard,
        clearGroupsLoadError,
        clearEquipmentsLoadError,
        clearEquipmentCards,
        clearEquipmentFeatures,
        clearEquipmentTypes,
        clearGroups
    } = props;

    // При монтировании компонента сбрасываем ошибки и старые данные и загружаем новый список групп
    useEffect(() => {
        clearGroups();
        clearEquipmentCards();
        clearEquipmentsLoadError();
        clearGroupsLoadError();
        clearSelectedGroup();
        clearSelectedCard();
        clearEquipmentFeatures();
        clearEquipmentTypes();
        loadGroups();
    }, []);

    return (
        <div className={style.container}>
            {groupsLoadError ? <div className="load_error">{groupsLoadError}</div> : <GroupList/>}
        </div>
    );
}

let stateMap = mapStateToPropsFactory('GroupBlock');
let dispatchMap = mapDispatchToPropsFactory('GroupBlock');
export default connect(stateMap, dispatchMap)(GroupBlock);