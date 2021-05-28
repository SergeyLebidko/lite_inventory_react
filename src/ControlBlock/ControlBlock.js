import React from 'react';
import style from './ControlBlock.module.scss';

function ControlBlock() {
    return (
        <>
            <div className={`${style.container} ${style.group_control}`}>
                <input type="button" value="Добавить"/>
                <input type="button" value="Переименовать"/>
                <input type="button" value="Удалить"/>
            </div>
            <div className={`${style.container} ${style.equipment_control}`}>
                <input type="button" value="На главную"/>
                <input type="button" value="Добавить"/>
                <input type="button" value="Редактировать"/>
                <input type="button" value="Удалить"/>
                <input type="button" value="Статистика"/>
            </div>
        </>
    );
}

export default ControlBlock;