import React from 'react';
import style from './EquipmentBlock.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';
import mapDispatchToPropsFactory from '../store/dispatchMaps';

function EquipmentBlock() {
    return (
        <div className={style.container}>
            Здесь будет список карточек оборудования
        </div>
    );
}

let stateMap = mapStateToPropsFactory('EquipmentBlock');
let dispatchMap = mapDispatchToPropsFactory('EquipmentBlock');
export default connect(stateMap, dispatchMap)(EquipmentBlock);