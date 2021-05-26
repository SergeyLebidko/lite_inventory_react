import React, {useEffect} from 'react';
import style from './GroupBlock.module.scss';
import GroupList from '../GroupList/GroupList';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupBlock({loadGroups}) {
    // При монтировании компонента загружаем список групп
    useEffect(() => loadGroups(), []);

    return (
        <div className={style.container}>
            <GroupList/>
        </div>
    );
}

let dispatchMap = mapDispatchToPropsFactory('GroupBlock');
export default connect(null, dispatchMap)(GroupBlock);