import React from 'react';
import ControlBlock from '../ControlBlock/ControlBlock';
import GroupBlock from '../GroupBlock/GroupBlock';
import EquipmentBlock from '../EquipmentBlock/EquipmentBlock';
import style from './Inventory.module.scss';

import {connect} from 'react-redux';
import mapStateToPropsFactory from '../store/stateMaps';

function Inventory({hasAccount}) {
    return (
        <>
            {hasAccount ?
                <>
                    <ControlBlock/>
                    <GroupBlock/>
                    <EquipmentBlock/>
                </>
                :
                <div className={style.container}>
                    Для доступа к инвентарю Вам нужно выполнить вход или зарегистрироваться
                </div>
            }
        </>
    )
}

let stateMap = mapStateToPropsFactory('Inventory');
export default connect(stateMap)(Inventory);