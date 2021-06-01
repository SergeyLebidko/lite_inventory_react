import React from 'react';
import {connect} from 'react-redux';
import {createMaps} from '../store/maps';
import style from './GroupList.module.scss';

function hasUnderGroup(groups, parentGroupId) {
    for (let group of groups) if (group.group === parentGroupId) return true;
    return false;
}

function GroupList({groups, parentGroupId, selectedGroup, setSelectedGroup, loadEquipments, clearSelectedCard}) {
    if (!groups || groups.length === 0) return '';

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
                           loadEquipments={loadEquipments}
                           clearSelectedCard={clearSelectedCard}
                />
            );
        }

        let groupClickHandler = group => {
            if (selectedGroup && selectedGroup.id === group.id) return;
            clearSelectedCard();
            setSelectedGroup(group);
            loadEquipments(group);
        }
        return (
            <li key={group.id}>
                <span className={spanClass} onClick={() => groupClickHandler(group)}>
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

export default connect(...createMaps('GroupList'))(GroupList);

