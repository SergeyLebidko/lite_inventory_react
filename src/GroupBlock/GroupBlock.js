import React, {useEffect} from 'react';
import style from './GroupBlock.module.scss';
import GroupList from '../GroupList/GroupList';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupBlock({loadGroups, clearSelectedGroup}) {
    // При монтировании компонента загружаем список групп и сбрасываем выбранную группу
    useEffect(() => {
        loadGroups();
        clearSelectedGroup()
    }, []);

    return (
        <div className={style.container}>
            <GroupList/>
        </div>
    );
}

let dispatchMap = mapDispatchToPropsFactory('GroupBlock');
export default connect(null, dispatchMap)(GroupBlock);