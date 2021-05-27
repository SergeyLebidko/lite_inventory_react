import React, {useEffect} from 'react';
import style from './EquipmentBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EquipmentBlock(props) {
    let {
        cards,
        selectedGroup,
        loadEquipments,
        equipmentsLoadError,
        clearEquipmentsLoadError,
        clearCards,
        clearFeatures,
        clearTypes
    } = props;

    // При монтировании компонента сбрасываем ошибки и списки карточек, характеристи и типов
    useEffect(() => {
        clearEquipmentsLoadError();
        clearCards();
        clearFeatures();
        clearTypes();
    }, []);

    // При изменении выбранной группы обновляем список оборудования и характеристик
    useEffect(() => {
        loadEquipments(selectedGroup)
    }, [selectedGroup]);

    let content;

    if (equipmentsLoadError !== null) {
        content = <div className="load_error">{equipmentsLoadError}</div>;
    } else {
        if (!selectedGroup) {
            content = '';
        } else {
            // TODO content = Список объектов с карточками
        }
    }

    return (
        <div className={style.container}>
            {content}
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EquipmentBlock');
let dispatchMap = mapDispatchToPropsFactory('EquipmentBlock');
export default connect(stateMap, dispatchMap)(EquipmentBlock);