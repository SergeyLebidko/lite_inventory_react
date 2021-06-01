import React from 'react';
import {connector} from '../store/storeConnector';
import style from './RemoveCardModal.module.scss';

function RemoveCardModal({closeForm}) {
    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Вы действительно хотите удалить выделенную карточку?</h1>
            <div className={style.control}>
                <input type="button" value="Нет" onClick={closeForm}/>
                <input type="button" value="Да"/>
            </div>
        </div>
    )
}

export default connector(RemoveCardModal);