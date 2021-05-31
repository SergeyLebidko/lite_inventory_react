import React, {useEffect} from 'react';
import GroupList from '../GroupList/GroupList';
import connector from '../store/storeConnector';
import style from './GroupBlock.module.scss';

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

export default connector(GroupBlock);