import React, {useEffect} from 'react';
import style from './GroupBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function GroupBlock({groups, loadGroups}) {
    // При монтировании компонента загружаем список групп
    useEffect(() => loadGroups(), []);

    return (
        <div className={style.container}>
            <ul>
                {groups.map(value => <li key={value.id}>{value.title}</li>)}
            </ul>
        </div>
    );
}

let stateMap = mapStateToPropsFactory('GroupBlock');
let dispatchMap = mapDispatchToPropsFactory('GroupBlock');
export default connect(stateMap, dispatchMap)(GroupBlock);