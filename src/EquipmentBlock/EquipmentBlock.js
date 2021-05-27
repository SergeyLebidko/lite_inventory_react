import React, {useEffect} from 'react';
import style from './EquipmentBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EquipmentBlock({cards, features, loadEquipments, selectedGroup, equipmentsLoadError, clearEquipmentsLoadError}) {
    // При монтировании компонента сбрасываем ошибки
    useEffect(() => clearEquipmentsLoadError(), []);

    // При изменении выбранной группы обновляем список оборудования и характеристик
    useEffect(() => {
        loadEquipments(selectedGroup)
    }, [selectedGroup]);

    if (selectedGroup === null) return '';

    return (
        <div className={style.container}>
            {equipmentsLoadError !== null ?
                <div className="load_error">{equipmentsLoadError}</div>
                :
                "Здесь будет список оборудования"
            }
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EquipmentBlock');
let dispatchMap = mapDispatchToPropsFactory('EquipmentBlock');
export default connect(stateMap, dispatchMap)(EquipmentBlock);