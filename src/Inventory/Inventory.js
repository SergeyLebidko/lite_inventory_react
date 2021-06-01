import React from 'react';
import ControlBlock from '../ControlBlock/ControlBlock';
import GroupBlock from '../GroupBlock/GroupBlock';
import EquipmentBlock from '../EquipmentBlock/EquipmentBlock';
import {connect} from 'react-redux';
import {connector} from '../store/maps';
import style from './Inventory.module.scss';

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

export default connect(...connector('Inventory'))(Inventory);