import React from 'react';
import ControlBlock from '../ControlBlock/ControlBlock';
import GroupBlock from '../GroupBlock/GroupBlock';
import EquipmentBlock from '../EquipmentBlock/EquipmentBlock';
import style from './Inventory.module.scss';

function Inventory(){
    return (
        <>
            <ControlBlock/>
            <GroupBlock/>
            <EquipmentBlock/>
        </>
    );
}

export default Inventory;