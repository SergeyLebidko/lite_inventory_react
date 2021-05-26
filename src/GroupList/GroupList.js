import React from 'react';
import style from './GroupList.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function hasUnderGroup(groups, parentGroupId) {
    for (let group of groups) if (group.group === parentGroupId) return true;
    return false;
}

function GroupList({groups, parentGroupId, selectedGroup, setSelectedGroup}) {
    if (groups.length === 0) return '';

    let currentGroups = groups.filter(value => value.group === parentGroupId);

    let createListElement = group => {
        let spanClass = selectedGroup && selectedGroup.id === group.id ? style.selected : '';
        let underGroupContent = '';

        if (hasUnderGroup(groups, group.id)) {
            underGroupContent = (
                <GroupList groups={groups}
                           parentGroupId={group.id}
                           selectedGroup={selectedGroup}
                           setSelectedGroup={setSelectedGroup}
                />
            );
        }
        return (
            <li key={group.id}>
                <span className={spanClass} onClick={() => setSelectedGroup(group)}>
                      {group.title}
                </span>
                {underGroupContent}
            </li>
        )
    }

    return (
        <ul className={style.container}>
            {currentGroups.map(group => createListElement(group))}
        </ul>
    );
}

GroupList.defaultProps = {
    parentGroupId: null
}

let stateMap = mapStateToPropsFactory('GroupList');
let dispatchMap = mapDispatchToPropsFactory('GroupList');
export default connect(stateMap, dispatchMap)(GroupList);

