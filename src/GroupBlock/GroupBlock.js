import React, {useEffect} from 'react';
import style from './GroupBlock.module.scss';
import GroupList from '../GroupList/GroupList';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';
import mapStateToPropsFactory from '../store/stateMaps';

function GroupBlock({loadGroups, groupsLoadError, clearSelectedGroup, clearGroupsLoadError, clearEquipmentsLoadError}) {
    // При монтировании компонента загружаем список групп и сбрасываем выбранную группу и ошибки загрузки
    useEffect(() => {
        clearEquipmentsLoadError();
        clearGroupsLoadError();
        clearSelectedGroup();
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