import React from 'react';
import style from './GroupList.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';

function hasUnderGroup(groups, parentGroupId) {
    for (let group of groups) if (group.group === parentGroupId) return true;
    return false;
}

function GroupList({groups, parentGroupId}) {
    if (groups.length === 0) return '';

    let currentGroups = groups.filter(value => value.group === parentGroupId);
    let content = (
        <>
            {currentGroups.map(value => {
                return (
                    <li key={value.id}>
                        <span>{value.title}</span>
                        {hasUnderGroup(groups, value.id) ? <GroupList groups={groups} parentGroupId={value.id}/> : ''}
                    </li>
                )
            })}
        </>
    );

    return (
        <ul>
            {content}
        </ul>
    );
}

GroupList.defaultProps = {
    parentGroupId: null
}

let stateMap = mapStateToPropsFactory('GroupList');
export default connect(stateMap)(GroupList);

