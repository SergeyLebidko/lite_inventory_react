import React from 'react';
import {connector} from '../store/storeConnector';
import style from './TypesModal.module.scss';

function TypesModal({closeForm}) {
    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Добавляйте, изменяйте или удаляйте типы оборудования</h1>
            <em>
                Учтите, что при удалении типа оборудования, все карточки, связанные с этим типом также будут удалены
            </em>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

export default connector(TypesModal);